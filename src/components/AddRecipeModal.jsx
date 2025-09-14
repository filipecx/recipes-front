export function AddRecipeModal({ isAddRecepiOpen }) {
    if (isAddRecepiOpen) {
        return (
            <>
                <form action="">
                    <label htmlFor="">
                        <p>Recipe Title</p>
                        <input type="text" />
                    </label>
                </form>
            </>
        )
    }   
}