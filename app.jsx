class Model {
    constructor() {
        this.comments = [];
        this.inputValue = null;
        this.inputValue2= null;
        this.callback = null;
    }
    subscribe(render) {
        this.callback = render;
    }

    notify() {
        this.callback();
    }
    addComments() {
    console.log(this.inputValue.value);
    if(this.inputValue!= null && this.inputValue.value !='' && this.inputValue2!=null){
        this.comments.push({
            name: this.inputValue.value,
            id: Utils.uuid(),
            person: this.inputValue2.value
        });
        this.inputValue.value = '';
        this.notify();
    }
    }
    deleteComments(id) {
        for (let i in this.comments)
            if (this.comments[i].id == id) {
                this.comments.splice(i , 1);
            }
        this.notify();
    }


}
const CommentsList = ({title, model}) => {return ( <ul> {
                model.comments.map((commentId, index) => {
                    return <li  key = {commentId.id} className={commentId.clase}> 
                    {commentId.person}<br/>{commentId.name}<br/>
                    <button onClick = { () => model.deleteComments(commentId.id)
                        } > Remove Comment </button>
                           </li> ;
                })
            } </ul>);
        }

const CommentsApp = ({title,model}) => {
            return ( <div className = "wrapper" >
                <header >
                 <p> Add Comment </p> <form onSubmit = {
                    (e) => {
                        e.preventDefault();
                        model.addComments()
                    }
                } >
                <input type = "text" placeholder = "name"onChange = {
                    e => (model.inputValue2 = e.target)
                }/>
                <input type = "text" placeholder = "comment"onChange = {
                    e => (model.inputValue = e.target)
                }/>
                <button type = "submit" > Submit </button> </form> </header>
                 <div className = "main" >
                < h2 > My coments </h2> <
                CommentsList model = {model}
                /> </div>
            </div>
            );
        }

        let COMENTARIOS = [];
        let model = new Model(COMENTARIOS);
        let counter = 1;

        let render = () => {
            ReactDOM.render( <
                CommentsApp title = "RegistrationApp"
                model = {model}
                />,
                document.getElementById("container")
            );
        };

        model.subscribe(render);

        render();
