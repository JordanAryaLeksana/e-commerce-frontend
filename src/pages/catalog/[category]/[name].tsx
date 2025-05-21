import axiosClient from "@/lib/axios"

interface ItemData {
  id: string
  name: string
  price: number
}

interface CartItemsPageProps {
  item: ItemData
  category: string
  name: string
}

export default function CartItems({ item, category, name }: CartItemsPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Item Detail</h1>
      <p className="mt-4 text-lg">Category: {category}</p>
      <p className="mt-2 text-lg">Name: {name}</p>
      <p className="mt-2 text-lg">Item ID: {item.id}</p>
      <p className="mt-2 text-lg">Price: {item.price}</p>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { category, name } = context.params

  try {
    const response = await axiosClient.get(`/items/getItemsbyId/${name}`)

    return {
      props: {
        item: response.data.data,
        category,
        name,
      },
    }
  } catch (error) {
    console.error("SSR fetch error:", error)

    return {
      notFound: true,
    }
  }
}
