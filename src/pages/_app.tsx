import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MainLayout } from '@/components/layouts/mainlayout'
import { RootProvider } from '@/components/providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </RootProvider>
  )
}
