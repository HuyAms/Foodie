import * as auth from '../auth-provider'

export interface ClientConfig extends RequestInit {
  data?: Record<string, any>
  token?: string
}

export function client(
  endpoint: string,
  { data, token, headers: customHeaders, ...customConfig }: ClientConfig = {}
) {
  const apiUrl = process.env.REACT_APP_API_URL

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      // @ts-ignore
      Authorization: token ? `Bearer ${token}` : undefined,
      // @ts-ignore
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json()

      if (response.status === 400) {
        await auth.logout()

        // refresh page
        window.location.reload()
        return Promise.reject({ message: 'Please re-authenticate.' })
      }

      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}
