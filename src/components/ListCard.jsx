export function ListCard ({title, description}) {
    return (
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
    )
}