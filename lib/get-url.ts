export default function getURL(url?: string) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const normalizedURL = url && !url.startsWith('/') ? `/${url}` : url || ''
    return `${baseURL}${normalizedURL}`
}
