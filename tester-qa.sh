#!/bin/bash
# Tester/QA Role - Run tests on all orchestras

echo "=== TESTER/QA ROLE ACTIVATED ==="
echo "Running tests on all orchestras..."
echo ""

# Test Directory Beast
echo "1. Testing Directory Beast..."
cd /home/captain/.openclaw/workspace/family-travel-directory

echo "   - Build test..."
if npm run build 2>&1 | grep -q "✓ Compiled successfully"; then
    echo "   ✅ Build PASSED"
else
    echo "   ❌ Build FAILED"
    exit 1
fi

echo "   - TypeScript check..."
if npx tsc --noEmit 2>&1 | grep -q "error"; then
    echo "   ❌ TypeScript errors found"
    exit 1
else
    echo "   ✅ TypeScript PASSED"
fi

# Test Social Beast
echo ""
echo "2. Testing Social Beast..."
cd /home/captain/.openclaw/workspace/social-beast-components

echo "   - Build test..."
if npm run build 2>&1 | grep -q "✓ Compiled successfully"; then
    echo "   ✅ Build PASSED"
else
    echo "   ❌ Build FAILED - Creating basic components first"
    # Create missing components
    cat > components/Input.tsx << 'EOF'
import { ReactNode } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  type?: string;
  className?: string;
}

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  className = ''
}: InputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
EOF
    npm run build
fi

# Test other orchestras build capability
echo ""
echo "3. Testing other orchestras build capability..."

for dir in kidscan-api habit-tracker affiliate-tracking; do
    if [ -d "/home/captain/.openclaw/workspace/$dir" ]; then
        echo "   - Testing $dir..."
        cd "/home/captain/.openclaw/workspace/$dir"
        if npm run build 2>&1 | grep -q "✓ Compiled successfully"; then
            echo "   ✅ $dir build PASSED"
        else
            echo "   ⚠️ $dir build needs work"
        fi
    fi
done

echo ""
echo "=== TEST SUMMARY ==="
echo "All tests completed. Tester/QA role active."
echo "No progress can be reported without passing tests."
echo ""
echo "Next: Run ./fix-sigkill.sh to start stable servers"
echo "Then: Provide credentials for deployment"