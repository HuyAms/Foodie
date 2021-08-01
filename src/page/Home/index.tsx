import React from 'react'
import { useAsync } from '../../utils/hook'
import { client } from '../../utils/api-client'
import FullPageSpinner from '../../components/FullPageSpinner'
import Card from '../../components/Card'
import { FoodMenuWrapper, HomePageLayout } from './style'
import ErrorMessage from '../../components/ErrorMessage'

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

function Home() {
  const { data, isLoading, isError, error, run } =
    useAsync<FoodMenuResponse, Error>()

  React.useEffect(() => {
    run(client('search?query=sushi'))
  }, [])

  function renderFoodMenu() {
    if (isLoading) {
      return <FullPageSpinner />
    }

    if (isError) {
      return <ErrorMessage error={error} />
    }

    return (
      <FoodMenuWrapper>
        {data?.menuItems.map(({ title, image, restaurantChain }) => (
          <Card title={title} description={restaurantChain} imgUrl={image} />
        ))}
      </FoodMenuWrapper>
    )
  }

  return <HomePageLayout>{renderFoodMenu()}</HomePageLayout>
}

export default Home
