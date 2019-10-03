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
        refreshBtn: false,
        minComments: 40
    };

    //Function for fetch Data from API
    fetchData = async() => {
        try{
            let data = await fetch('https://www.reddit.com/r/reactjs.json?limit=100');
            let json;
            json = await data.json();
            this.setState({
                data: json.data.children,
                isLoading: false
            })
        }catch (e) {
            console.log('Error: ', e)
        }
    };

    //Fetch data
    componentDidMount(){
        this.fetchData()
    }

    //Set interval for refresh data by clicking Refresh btn and Stop refresh by toggle
    autoRefresh = null;
    refreshData = () => {
        if(this.state.refreshBtn){
            clearInterval(this.autoRefresh);
            this.setState({ refreshBtn: false })
        }else{
            this.autoRefresh = setInterval(this.fetchData, 3000);
            this.setState({ refreshBtn: true })
        }
    };

    handleRangeBar = (minComments) => {
        this.setState({ minComments })
    };

    getDataByComments = (data, minComments) => {
        return data
            .sort((a,b) => b.data.num_comments - a.data.num_comments)
            .filter(item => item.data.num_comments >= minComments);
    };

    render(){
        const {data, isLoading, refreshBtn, minComments} = this.state;
        const sortDataByComments = this.getDataByComments(data, minComments);
        return (
            <div className="wrap">
                <Header/>
                {isLoading ?
                    <div>Loading...</div>
                    :
                    <React.Fragment>
                        <RefreshButton refreshData={this.refreshData} refreshBtn={refreshBtn}/>
                        <RangeBar handleRangeBar={this.handleRangeBar} minComments={minComments}/>
                        {sortDataByComments.length > 0
                            ?
                            <Gallery data={sortDataByComments}/>
                            :
                            <h4>No results found your criteria</h4>}
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default App;
