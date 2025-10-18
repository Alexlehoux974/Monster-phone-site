#!/bin/bash
set -e

SUPABASE_URL="https://nswlznqoadjffpxkagoz.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI"

echo "🚀 Applying migration to Supabase..."
echo ""

# Execute SQL via PostgreSQL REST API
# Note: Supabase doesn't have a direct SQL execution endpoint, so we need to use psql or the dashboard

echo "⚠️ Cannot execute SQL directly via REST API."
echo "📋 Please execute the following SQL in Supabase Dashboard > SQL Editor:"
echo ""
echo "----------------------------------------"
cat /tmp/apply_migration.sql
echo "----------------------------------------"
echo ""
echo "Or use this command:"
echo "psql postgresql://postgres.nswlznqoadjffpxkagoz:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres -f /tmp/apply_migration.sql"
