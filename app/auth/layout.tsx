import { headers, cookies } from 'next/headers'
import SupabaseListener from '../components/supabase-listener'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../database.types'

export default async function AuthLayout({children,}: { children: React.ReactNode }) {
    // サーバー側でSupabaseのクライアントを作成
    const supabase = createServerComponentSupabaseClient<Database>({
        headers, // クライアントで持っているアクセストークンをサーバーに渡す
        cookies,
    })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    return (
        <>
            <SupabaseListener accessToken={session?.access_token} />
            {children}
        </>
    )
}
