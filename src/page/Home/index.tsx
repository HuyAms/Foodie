import React from 'react'
import { useAsync } from '../../utils/hook'
import { client } from '../../utils/api-client'
import FullPageSpinner from '../../components/FullPageSpinner'
import Card from '../../components/Card'
import {
  FoodMenuWrapper,
  HomePageLayout,
  NotFoundContainer,
  NotFoundText,
  NotFoundImage,
  Heading,
} from './style'
import ErrorMessage from '../../components/ErrorMessage'
import { useLocation } from 'react-router-dom'
import NotFoundImg from '../../assets/notfound.png'

export interface IFoodItem {
  id: number
  title: string
  image: string
  imageType: string
  restaurantChain: string
  servingSize: number
  readableServingSize: string
}

interface FoodMenuResponse {
  totalMenuItems: number
  menuItems: IFoodItem[]
}

interface ServerError {
  message: string
}

function Home() {
  const { data, isLoading, isError, error, run } =
    useAsync<FoodMenuResponse, ServerError>()

  const searchParams = new URLSearchParams(useLocation().search)
  const query = searchParams.get('q') as string

  React.useEffect(() => {
    const search = query ? query : ' sushi'
    run(client(`search?query=${search}`))
  }, [run, query])

  function renderFoodMenu() {
    if (isLoading) {
      return <FullPageSpinner />
    }

    if (isError) {
      return error ? <ErrorMessage message={error.message} /> : null
    }

    if (data?.totalMenuItems === 0) {
      return (
        <NotFoundContainer>
          <NotFoundImage src={NotFoundImg} alt="not found" />
          <NotFoundText>No results found</NotFoundText>
        </NotFoundContainer>
      )
    }

    return (
      <>
        <Heading>Popular right now</Heading>
        <FoodMenuWrapper>
          {data?.menuItems.map(({ id, title, image, restaurantChain }) => (
            <li key={id}>
              <Card
                title={title}
                description={restaurantChain}
                imgUrl={image}
              />
            </li>
          ))}
        </FoodMenuWrapper>
      </>
    )
  }

  return <HomePageLayout>{renderFoodMenu()}</HomePageLayout>
}

export default Home
