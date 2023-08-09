'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../utils/supabase'
import useStore from '../../store'

export default function SupabaseListener(
    {accessToken,}: { accessToken?: string }
) {
    const router = useRouter()
    const { updateLoginUser } = useStore()

    useEffect(() => {
        // Supabaseで管理しているログインユーザー情報を取得
        const getUserInfo = async () => {
            // ログインしている場合はログインユーザー情報を取得
            const { data } = await supabase.auth.getSession()

            //
            if (data.session) {
                updateLoginUser({
                    id: data.session?.user.id,
                    email: data.session?.user.email!,
                })
            }
        }
        getUserInfo()

        // ログイン状態が変更された場合に実行される関数を設定
        // セッション情報を監視して、ログイン・ログアウト時にログインユーザー情報を更新
        supabase.auth.onAuthStateChange((_, session) => {
            updateLoginUser({ id: session?.user.id, email: session?.user.email! })

            // サーバーで管理しているアクセストークンとクライアントで管理しているアクセストークンが異なる場合はリフレッシュ
            if (session?.access_token !== accessToken) {
                router.refresh()
            }
        })
    }, [accessToken])
    return null
}
