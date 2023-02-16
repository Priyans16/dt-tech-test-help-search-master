import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Pagination } from './Pagination';

export function Search() {
    const [searchEle, setSearchEle] = useState("");
    const [searchArray, setSearchArray] = useState([]);
    const [curData, setCurData] = useState([]);
    const [curDataWithApi, setCurDataWithApi] = useState([]);

    /**
     * This method handles assigning the value to the variables
     * 
     * @param {*} type - case name of variable to be handled
     * @param {*} ele - value of the variable declared using hooks
     */
    const handleData = (type, ele) => {
        switch (type) {
            case 'search': {
                setSearchEle(ele.target.value);
                break;
            }
            case 'curData': {
                setCurData(ele);
                break;
            }
            default: break;
        }
    }

    /**
     * This method searches the string provided in 
     * the input of search box
     * 
     * @param {*} page - (optional) page number to be 
     * searched in the result
     */
    const searchItem = (page = null) => {
        if (page === null) {
            axios.get(`http://localhost:3001/search?query=${searchEle}`).then(
                (res) => {
                    setSearchArray(res.data.results);
                }
            )
            setPageNumber(0); // trigger => setting initial data => data through api
        }
        else {
            axios.get(`http://localhost:3001/search/${page}?query=${searchEle}`).then(
                (res) => {
                    setCurDataWithApi(res.data.results);
                }
            )
        }
    }

    /**
     * This method is specific to Internal Pagination
     * section and assigns provided value to display 
     * current data array in the section
     * 
     * @param {*} value - array value of the 'curData' variable
     */
    const setCurrentData = (value) => {
        handleData('curData', value);
    }

    /**
     * This method is specific to Pagination With API
     * section and searches the result w.r.t page number provided
     * 
     * @param {*} pageNo - selected page number
     */
    const setPageNumber = (pageNo) => {
        searchItem(pageNo)
    }

    return (
        <>
            <input type="text" key="search" value={searchEle} onChange={(e) => handleData('search', e)} />
            <button onClick={() => searchItem()}>Search</button>
            {/* Same Pagination Component has been re-used 
                for both the display sections with some difference 
                in props
            - Internal Pagination and Pagination With API*/}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ marginRight: '25px' }}>
                    <p>Internal Pagination</p>
                    {searchArray.length > 0 ? curData?.length > 0 && curData?.map((item, index) => {
                        return <li key={"search-" + index}>{item.title}</li>
                    }) : <p>No Data Available</p>}
                    {searchArray.length > 0 && <Pagination pageSize={10} data={searchArray}
                        api={false} setCurrentData={setCurrentData}>
                    </Pagination>}
                </div>
                <div>
                    <p>Pagination With API</p>
                    {searchArray.length > 0 ? curDataWithApi?.length > 0 && curDataWithApi?.map((item, index) => {
                        return <li key={"search-api-" + index}>{item.title}</li>
                    }) : <p>No Data Available</p>}
                    {searchArray.length > 0 && <Pagination pageSize={10} data={searchArray}
                        api={true} setPageNumber={setPageNumber}>
                    </Pagination>}
                </div>
            </div>
        </>
    )
}

