import { CategoryInformation } from './_components/category-information'

export default function Overview({ params }: { params: { slug: string } }) {
	const category = params.slug

	return <CategoryInformation id={category} />
}
