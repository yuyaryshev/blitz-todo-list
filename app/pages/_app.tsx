import {AppProps, AuthorizationError, ErrorComponent, ErrorFallbackProps, Head, useRouter} from 'blitz'
import {ErrorBoundary} from 'react-error-boundary'
import {queryCache, QueryClient, QueryClientProvider, useQuery } from 'react-query'

import 'app/core/styles/index.css'

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    const getLayout = Component.getLayout || ((page) => page)
    const router = useRouter()

    return (
        <QueryClientProvider client={queryClient}>
        <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            resetKeys={[router.asPath]}
            onReset={() => {
                // This ensures the Blitz useQuery hooks will automatically refetch
                // data any time you reset the error boundary
                queryCache.resetErrorBoundaries()
            }}
        >
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Playfair+Display:400,500,700,800,900|Sen&display=swap"
                    rel="stylesheet"
                />
            </Head>
            {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
        </QueryClientProvider>
    )
}

function RootErrorFallback({error, resetErrorBoundary}: ErrorFallbackProps) {
    if (error instanceof AuthorizationError) {
        return <ErrorComponent statusCode={error.statusCode} title="Sorry, you are not authorized to access this" />
    } else {
        return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    }
}


/*
import {AppProps, AuthorizationError, ErrorComponent, ErrorFallbackProps, Head, useRouter} from 'blitz'
import {ErrorBoundary} from 'react-error-boundary'
import {queryCache} from 'react-query'

import 'app/core/styles/index.css'

export default function App({Component, pageProps}: AppProps) {
    const getLayout = Component.getLayout || ((page) => page)
    const router = useRouter()

    return (
        <SafeHydrate>
        <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            resetKeys={[router.asPath]}
            onReset={() => {
                // This ensures the Blitz useQuery hooks will automatically refetch
                // data any time you reset the error boundary
                queryCache.resetErrorBoundaries()
            }}
        >
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Playfair+Display:400,500,700,800,900|Sen&display=swap"
                    rel="stylesheet"
                />
            </Head>
            {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
        </SafeHydrate>
    )
}

function RootErrorFallback({error, resetErrorBoundary}: ErrorFallbackProps) {
    if (error instanceof AuthorizationError) {
        return <ErrorComponent statusCode={error.statusCode} title="Sorry, you are not authorized to access this" />
    } else {
        return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    }
}

function SafeHydrate({ children }) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

*/