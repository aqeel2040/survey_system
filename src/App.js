import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHouse, faChartBar, faListCheck, faCog, faBook, faHeadset, faCircleUser, faArrowRight, faArrowDown, faArrowUp, faPlus, faCopy, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const customData = [
  {
    survey_id: '262c7ecb-982d-11ed-bba1-022b4079eda1',
    survey_instance_id: '30985c7f-98ed-11ed-bba1-022b4079eda1',
    survey_revision: 1,
    title: 'Data Systems 101',
    description: 'Spring 2023',
    statusText: 'Active',
    start_timestamp: '2023-04-01 00:00:00',
    end_timestamp: '2023-05-01 00:00:00',
    survey_url: 'https://foo.net',
  },
  {
    survey_id: '262dece9-982d-11ed-bba1-022b4079eda1',
    survey_instance_id: '566cde6b-98ed-11ed-bba1-022b4079eda1',
    survey_revision: 1,
    title: 'Data Systems 102',
    description: 'Spring 2023',
    statusText: 'Pending',
    start_timestamp: '2023-03-01 00:00:00',
    end_timestamp: '2023-05-01 00:00:00',
    survey_url: 'https://bar.net',
  },
];

function App() {
  const [startDate, setStartDate] = useState(null);
  const [dateRange, setDateRange] = useState('');
  const [surveys, setSurveys] = useState(customData);
  const [, setSortOrder] = useState('asc');
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const currentDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  const sortData = (order) => {
    const sortedData = [...surveys].sort((a, b) => {
      const dateA = new Date(a.start_timestamp);
      const dateB = new Date(b.start_timestamp);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setSurveys(sortedData);
  };


  const handleSortToggle = () => {
    setIsSortedAsc(!isSortedAsc);
    setSortOrder(isSortedAsc ? 'desc' : 'asc');
    sortData(isSortedAsc ? 'desc' : 'asc');
  };

  const getStatusColor = (statusText) => {
    switch (statusText) {
      case 'Active':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Disabled':
        return 'gray';
      case 'Deleted':
        return 'red';
      default:
        return 'black';
    }
  };

  const getStatusBackground = (statusText) => {
    switch (statusText) {
      case 'Active':
        return 'bg-primary-subtle';
      case 'Pending':
        return 'bg-warning-subtle';
      case 'Disabled':
        return 'bg-secondary-subtle';
      case 'Deleted':
        return 'bg-danger-subtle';
      default:
        return '';
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleDateChange = (date) => {
    const selectedDateObj = new Date(date);
    const formattedStartDate = formatDate(selectedDateObj);
    const nextDay = new Date(selectedDateObj);
    nextDay.setDate(nextDay.getDate() + 2);
    const formattedEndDate = formatDate(nextDay);
    setDateRange(`${formattedStartDate} - ${formattedEndDate}`);
    setStartDate(date);
  };

  useEffect(() => {
    const cookies = {
      'classranked_username': 'XXXXXX',
      'auth_token': 'YYYYYYY'
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    fetch('https://{domain}/api/instances/', {
      method: 'GET',
      headers: {
        ...headers,
        'Cookie': Object.keys(cookies).map(key => `${key}=${cookies[key]}`).join('; ')
      },
      credentials: 'same-origin'
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Fetch failed:', error);
      });
  }, []);

  const displayData = surveys.length > 0 ? surveys : customData;

  return (
    <div className="app">
      <div className="sidebar border ms-4">
        <div className='data p-3'>
          <h2 className='my-4'>Logo</h2>
          <div className="input-group mb-4 border rounded-3 p-1">
            <div className="input-group-prepend border-0">
              <button id="button-addon4" type="button" className="btn btn-link text-info"><FontAwesomeIcon className='text' icon={faSearch} /></button>
            </div>
            <input type="search" placeholder="Search" aria-describedby="button-addon4" className="form-control p-0 bg-none border-0"></input>
          </div>
          <div className='menu'>
            <h6 className='mt-4'>MENU</h6>
            <ul className="list-unstyled">
              <li className="mt-4">
                <a href="/" className="active text-decoration-none">
                  <FontAwesomeIcon className='text me-2' icon={faHouse} />
                  <span className="text">Homepage</span>
                </a>
              </li>
              <li className="mt-4">
                <a href="/" className="active text-decoration-none">
                  <FontAwesomeIcon className='text me-2' icon={faChartBar} />
                  <span className="text">Course Analytics</span>
                </a>
              </li>
              <li className="mt-4">
                <a href="/" className="active text-decoration-none">
                  <FontAwesomeIcon className='text me-2' icon={faBook} />
                  <span className="text">Survey Library</span>
                </a>
              </li>
              <li className="mt-4">
                <a href="/" className="active text-decoration-none">
                  <FontAwesomeIcon className='text me-2' icon={faListCheck} />
                  <span className="text">My Task</span>
                </a>
              </li>
            </ul>
          </div>
          <hr></hr>

          <div className='menu'>
            <h6 className='mt-4'>General</h6>
            <ul className="list-unstyled">
              <li className="mt-4">
                <a href="/" className="active text-decoration-none">
                  <FontAwesomeIcon className='text me-2' icon={faCog} />
                  <span className="text">Setting</span>
                </a>
              </li>
              <li className="mt-4">
                <a href="/" className="active text-decoration-none">
                  <FontAwesomeIcon className='text me-2' icon={faHeadset} />
                  <span className="text">Support</span>
                </a>
              </li>
              <li className="mt-4">
                <a href="/" className="active text-decoration-none">
                  <FontAwesomeIcon className='text me-2' icon={faCircleUser} />
                  <span className="text">Account</span>
                </a>
              </li>
              <li className="mt-4">
                <a href="/" className="active text-decoration-none">
                  <FontAwesomeIcon className='text me-2' icon={faArrowRight} />
                  <span className="text">logout</span>
                </a>
              </li>
            </ul>
          </div>
          <hr></hr>

          <div className='Image'>
            <img className='profile' alt="Profile-image" src="data:image/png;base64,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"></img>
            <span className='ms-3 fw-bold'>Test </span>
          </div>
          <span></span>
        </div>
      </div>
      <div className="container-fluid ps-0">
        <div className="main-content">
          <nav className="navbar  bg-body-tertiary border">
            <div className="ms-auto ">
              <a className="navbar-brand 5" href="/"><FontAwesomeIcon icon={faUser} /></a>
            </div>
          </nav>

          <div className='dashboard border p-4'>
            <h3 className='fw-bolder'>Survey Dashboard</h3>
            <p>All your survey activity displayed one convenient place</p>
            <button className='btn btn-outline-primary me-3 fw-bolder'> <FontAwesomeIcon className='me-3' icon={faArrowDown} />Export</button>
            <button className='btn btn-primary'> <FontAwesomeIcon icon={faPlus} /> New Survey</button>
          </div>
          <section className='ms-4 me-5'>
            <div className='survey'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className="input-group mb-4 border rounded-3 p-1 my-4">
                    <div className="input-group-prepend border-0">
                      <button id="button-addon4" type="button" className="btn btn-link text-info"><FontAwesomeIcon className='text' icon={faSearch} /></button>
                    </div>
                    <input type="search" placeholder="Search through your surveys..." aria-describedby="button-addon4" className="form-control p-0 bg-none border-0"></input>
                  </div>
                </div>

                <div className='col-md-6 d-flex my-4 border rounded-3 date'>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    customInput={<button className="btn btn-link text-secondary"><FontAwesomeIcon icon={faCalendarAlt} /></button>}
                    withPortal
                  />
                  <p id="dateRangeDisplay" className="my-2">{dateRange}</p>
                </div>
              </div>

            </div>

            <div className='table border rounded-3 mt-4'>
              <h5 className='ps-4 pt-4'>Your Surveys</h5>
              <table className="table mt-4 mb-5">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Title</th>
                    <th scope="col">
                      Date Created
                      <button onClick={handleSortToggle} className="btn btn-link">
                        <FontAwesomeIcon className='ms-2 text-dark'
                          icon={isSortedAsc ? faArrowUp : faArrowDown} />
                      </button>
                    </th>
                    <th scope="col">Hyperlink</th>
                  </tr>
                </thead>
                <tbody className='table-body'>
                  {displayData.map((item) => (
                    <tr key={item.index}>
                      <td
                        className='tableRow pt-4 ps-4 '
                        style={{ color: getStatusColor(item.statusText) }}
                      >
                        <span className={`rounded-4 ${getStatusBackground(item.statusText)} p-3 py-2`}>{item.statusText}</span>
                      </td>
                      <td className='tableRow pt-4'>{item.title}</td>
                      <td className='tableRow pt-4 '>{currentDate(item.start_timestamp)}</td>
                      <td className='tableRow pt-4'>
                        <div
                          className='border rounded-4'
                          style={{ display: 'flex', alignItems: 'center', width: '80%' }}
                        >
                          <a
                            className='ms-3'
                            href={item.survey_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ flex: 1 }}
                          >
                            {item.survey_url}
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(item.survey_url);
                            }}
                            className="btn btn-link text-primary"
                            style={{ marginLeft: '8px' }}
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
