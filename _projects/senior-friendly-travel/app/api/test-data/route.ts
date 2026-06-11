import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'public', 'data');
    const files = ['tokyo-family-activities.json', 'bangkok-family-activities.json', 'singapore-family-activities.json'];
    
    const allData = [];
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(content);
        allData.push({
          city: json.city,
          count: json.activities?.length || 0,
          file: file,
          exists: true
        });
      } else {
        allData.push({ file, exists: false });
      }
    }
    
    return NextResponse.json({
      success: true,
      dataDir,
      files: allData,
      totalActivities: allData.reduce((sum, d) => sum + (d.count || 0), 0)
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
      cwd: process.cwd()
    }, { status: 500 });
  }
}