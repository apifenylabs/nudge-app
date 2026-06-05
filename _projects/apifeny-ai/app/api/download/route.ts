import { NextRequest, NextResponse } from 'next/server';
import { getProductPdf, decodeDownloadToken } from '@/lib/product-pdf-map';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

// ════════════════════════════════════════════════════════════
// Secure download endpoint — validates token, serves PDF
// ════════════════════════════════════════════════════════════

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/?error=missing_token', req.url));
  }

  // Decode token
  const payload = decodeDownloadToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL('/?error=invalid_token', req.url));
  }

  // Token expires after 72 hours
  const MAX_AGE_MS = 72 * 60 * 60 * 1000;
  if (Date.now() - payload.issuedAt > MAX_AGE_MS) {
    return NextResponse.redirect(new URL('/?error=expired_token', req.url));
  }

  const product = getProductPdf(payload.productSlug);
  if (!product) {
    return NextResponse.redirect(new URL('/?error=unknown_product', req.url));
  }

  // Pro users get a redirect to the vault page
  if (product.tier === 'pro') {
    const vaultUrl = new URL('/download/vault', req.url);
    vaultUrl.searchParams.set('token', token);
    return NextResponse.redirect(vaultUrl);
  }

  // Serve single PDF
  const pdfFile = product.pdfFiles[0];
  if (!pdfFile) {
    return NextResponse.redirect(new URL('/?error=no_file', req.url));
  }

  const pdfPath = path.join(process.cwd(), 'public', 'downloads', pdfFile);
  
  if (!existsSync(pdfPath)) {
    return NextResponse.redirect(new URL('/?error=file_not_found', req.url));
  }

  try {
    const pdfBuffer = readFileSync(pdfPath);
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${pdfFile}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-store, private',
      },
    });
  } catch {
    return NextResponse.redirect(new URL('/?error=read_error', req.url));
  }
}
