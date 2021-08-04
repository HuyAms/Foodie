import {
  render,
  screen,
  waitForLoadingToFinish,
  within,
} from '../../test/app-test-utils'
import Home from './index'
import { server, rest } from '../../test/server/test-server'

const apiUrl = process.env.REACT_APP_API_URL

test('renders menu', async () => {
  await render(<Home />)

  await waitForLoadingToFinish()

  const menuList = screen.getByRole('list')
  const inMenuList = within(menuList)
  const items = inMenuList.getAllByRole('heading', { level: 2 })
  const itemName = items.map((item) => item.textContent)

  expect(itemName).toMatchInlineSnapshot(`
    Array [
      "Lunch Pairing, Spicy Tuna Roll and Chang's Crisp Salad",
      "Lunch Pairing, California Roll and Chang's Crisp Salad",
      "California Roll",
      "Tuna Roll",
      "Spicy Tuna Roll",
      "PP - Sushi - Combo",
      "Sushi Sampler, Tuna",
      "Sushi Sampler - Shrimp",
      "Sushi Sampler - Salmon",
      "Sushi Combination, Eel",
    ]
  `)
})

test('renders results when searching for a specific food', async () => {
  await render(<Home />, { route: '/search?q=burger' })

  await waitForLoadingToFinish()

  const menuList = screen.getByRole('list')
  const inMenuList = within(menuList)
  const items = inMenuList.getAllByRole('heading', { level: 2 })
  const itemName = items.map((item) => item.textContent)

  expect(itemName).toMatchInlineSnapshot(`
    Array [
      "Burger Sliders",
      "Bacon King Burger",
      "Hamburger",
      "Hamburger",
      "Hamburger",
      "Hamburger",
      "Hamburger",
      "Hamburger w/Onion",
      "Hamburger Patty, 2 oz",
      "Hamburger w/ mustard & ketchup instead of spread",
    ]
  `)
})

test('not found screen is displayed', async () => {
  await render(<Home />, { route: '/search?q=not-found' })

  await waitForLoadingToFinish()

  expect(
    screen.getByRole('heading', {
      name: /no results found/i,
    })
  ).toBeInTheDocument()
})

test('shows an error message when the menu fails to load', async () => {
  server.use(
    rest.get(`${apiUrl}/search`, async (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: 'There was an unexpected error!' })
      )
    })
  )

  await render(<Home />, { route: '/search?q=fail' })

  await waitForLoadingToFinish()

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was an unexpected error!"`
  )
})
