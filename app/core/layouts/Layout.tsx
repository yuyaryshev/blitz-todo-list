import {Head} from 'blitz'
import {ReactNode, Suspense} from 'react'
import {Heading} from '../components/Heading'

type LayoutProps = {
    title?: string
    children: ReactNode
}

function SafeHydrate({ children }) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

const Layout = ({title, children}: LayoutProps) => {
    //<SafeHydrate><Suspense fallback={<div>Loading...</div>}>{children}</Suspense></SafeHydrate>
    return (
        <div className="w-full max-w-xl px-5 box-border mx-auto">
            <Head>
                <title>{title || 'BlitzTodos'}</title>
            </Head>
            <Heading>{title}</Heading>
            <SafeHydrate><Suspense fallback={<div>Loading...</div>}>{children}</Suspense></SafeHydrate>
            {/*{children}*/}
        </div>
    )
}

export default Layout
