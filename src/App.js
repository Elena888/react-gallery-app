import React from 'react';
import Header from './components/Header'
import Gallery from './components/Gallery'
import RefreshButton from './components/RefreshButton'
import RangeBar from './components/RangeBar'
import './css/style.css'

class App extends React.Component{
    state = {
        data: [],
        isLoading: true,
        btnText: 'Start Auto Refresh',
        numComments: 40
    };

    //Function for fetch Data from API, sort Data, setState with loaded data
    fetchData = async() => {
        let data = await fetch('https://www.reddit.com/r/reactjs.json?limit=100');
        let json;
        if(data.ok){
            json = await data.json()
        }else{
            console.log('Error Http: ', data.status)
        }

        let dataByComments = [];
        json.data.children.map(item => {
            if(item.data.num_comments >= this.state.numComments){
                dataByComments.push(item);
            }
            return dataByComments;
        });

        let sortData = dataByComments;
        sortData.sort(function (a,b) {
            return b.data.num_comments - a.data.num_comments
        });

        this.setState({
            data: sortData,
            isLoading: false
        })
    };

    //Fetch data
    componentDidMount(){
        this.fetchData()
    }

    //Render app after state.numComments changed
    componentDidUpdate(prevProps, prevState) {
        if(this.state.numComments !== prevState.numComments){
            this.fetchData()
        }
    }
    //Set interval for refresh data by clicking Refresh btn and Stop refresh by toggle
    intervalId = null;
    refreshData = () => {
        if(this.state.btnText === 'Start Auto Refresh'){
            this.setState({
                btnText: 'Stop'
            });
            this.intervalId = setInterval(async() => {
                console.log(1)
                this.fetchData();
            }, 3000)
        }else{
            this.setState({
                btnText: 'Start Auto Refresh'
            });
            clearInterval(this.intervalId);
        }
    };

    handleRangeBar = (numComments) => {
        this.setState({ numComments })
    };

    render(){
        const {data, isLoading} = this.state;
        if(isLoading){
            return <div>Loading...</div>
        }
        return (
            <div className="wrap">
                <Header/>
                <RefreshButton refreshData={this.refreshData} btnText={this.state.btnText}/>
                <RangeBar handleRangeBar={this.handleRangeBar} numComments={this.state.numComments}/>
                <Gallery data={data}/>
                {data.length === 0 && <h4>No results found your criteria</h4>}
            </div>
        );
    }
}

export default App;
