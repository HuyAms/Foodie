import { rest } from 'msw'
import menuData from '../data/menu-data.json'
import burgerMenuData from '../data/menu-burger-data.json'
import notFoundMenuData from '../data/menu-not-found.json'

const apiUrl = process.env.REACT_APP_API_URL

export const handlers = [
  rest.get(`${apiUrl}/search`, async (req, res, ctx) => {
    const query = req.url.searchParams.get('query')

    if (query === 'burger') {
      return res(ctx.json(burgerMenuData))
    }

    if (query === 'not-found') {
      return res(ctx.json(notFoundMenuData))
    }

    return res(ctx.json(menuData))
  }),
]
