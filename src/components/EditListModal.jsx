export function EditListModal() {
    return (
        <div>
            <form className="w-4/5 max-w-md space-y-6" onSubmit={handleSubmit}>
                    <label htmlFor="">
                        List name 
                    <input
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500`}
                    type="text"  onChange={(e) => setListName(e.target.value)}/>
                    </label>

                    <button
                    className="my-2 w-full bg-green-200 text-white py-2 rounded-lg hover:bg-green-600"
                    type="submit">Add list</button>
                </form>
        </div>
    )
}