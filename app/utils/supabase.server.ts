import { createClient } from '@supabase/supabase-js'

let supabaseUrl = process.env.SUPABASE_URL
let supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_KEY')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
