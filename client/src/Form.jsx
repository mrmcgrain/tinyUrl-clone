
const Form = () => {
    return (
        <div id='Form'>

            <form encType="application/x-www-form-urlencoded"
                method="POST"
                action="/"
            >

                <input name="first" type="text" placeholder="first"></input>
<button type="submit"></button>
            </form>
            <p> Form </p>

        </div>
    )
};

export default Form
