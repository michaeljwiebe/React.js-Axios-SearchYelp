// class DisplayToDo extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.list = props.list
//     this.state = {
//       list: []
//     }
//     this.addItem = this.addItem.bind(this);
//     this.filterList = this.filterList.bind(this);
//   }
//
//   render() {
//     let list = this.state.list.map(function(item, index) {
//         return <div key={index}>{item.name}: {item.priority} priority</div>
//     })
//     return(
//         <div>
//             <div className="to-do-input">
//                 <input className="new-item" type="text" />
//                 <select id="priority">
//                     <option value="high">High</option>
//                     <option value="medium">Medium</option>
//                     <option value="low">Low</option>
//                 </select>
//                 <button onClick={this.addItem}>Add Item</button>
//             </div>
//
//             <div className="filter-control">
//                 <select id="priority">
//                     <option value="high">High</option>
//                     <option value="medium">Medium</option>
//                     <option value="low">Low</option>
//                 </select>
//                 <button onClick={this.filterList}>Filter by Priority</button>
//             </div>
//
//             <div className="list">
//                 {list}
//             </div>
//         </div>
//     )
//   }
//   addItem() {
//       var newItem = document.getElementsByClassName("new-item")[0].value;
//       var newPriority = document.getElementById("priority").value;
//       this.list.push({name: newItem, priority: newPriority});
//       this.setState({
//           list: this.list
//       })
//   }

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            businesses: [],
            term: ""
        };
        this.axiosCall = this.axiosCall.bind(this);

    }
    axiosCall(search){
        axios.get("https://yelp-search.herokuapp.com/search", {
            params: {
                location: search.location,
                term: search.term
            }
        }).then(function(response){
            console.log(response);
            this.setState({businesses: response.data.businesses})
        }.bind(this))
    }

    render(){


        return(
            <div>
                <SearchParams axiosCall={this.axiosCall} />
                <YelpResults results={this.state.businesses} />
            </div>
        )
    }
}

class SearchParams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: "",
            location: ""
        }

        this.axiosCall = props.axiosCall;
        this.handleAxiosCall = this.handleAxiosCall.bind(this);
        this.updateTerm = this.updateTerm.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
    }

    render(){
        return(
            <div>
                <input onChange={this.updateTerm} placeholder="food" type="text" />
                <input onChange={this.updateLocation} placeholder="location" type="text" />
                <button onClick={this.handleAxiosCall}>Search</button>
            </div>
        )
    }

    updateTerm(event){
        this.setState({term: event.target.value});
    }

    updateLocation(event){
        this.setState({location: event.target.value});
    }

    handleAxiosCall(){
        this.axiosCall({term: this.state.term, location: this.state.location})
    }
}

function YelpResults(props){
    let businesses = props.results.map(function(business, index){
        return(
            <div className="business" key={index}>
                <div className="business-info-container">
                    <div className="business-info">{business.name}</div>
                    <div className="business-info">{business.location.state_code}:{business.location.postal_code}</div>
                </div>
                <img src={business.image_url} />
            </div>
        )
    })
    return(
        <div>{businesses}</div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("react")
)
