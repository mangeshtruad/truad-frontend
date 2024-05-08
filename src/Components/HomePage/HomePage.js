import React, { useState, useEffect } from "react";
import "./HomePage.css";
import dark_mode from "../../Assets/dark_mode.png";
import bell from "../../Assets/bell.png";
import info from "../../Assets/info.png";
import search from "../../Assets/search.png";
import more from "../../Assets/more.png";
import done from "../../Assets/done.png";
import pending from "../../Assets/pending.png";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import BarChartIcon from "@mui/icons-material/BarChart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PopUp from "../UploadMaterial/PopUp";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { responsive, responsive1, Carousel } from "../videosider";
// >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user", "userdata"]);
  const [items, setItems] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [processedClips, setProcessedClips] = useState([]);
  const [index, setIndex] = useState(0);
// <<<<<<< HEAD
  const [availOpen, setAvailOpen] = useState(false);
  const [selectedOngoingClip, setSelectedOngoingClip] = useState(null);
  const [selectedProcessedClip, setSelectedProcessedClip] = useState(null);
  const [processedOpen, setProcessedOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false)
// =======
// >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

// <<<<<<< HEAD
  const aiToggle = () => {
    setAvailOpen(!availOpen);
  };

  const processedToggle = () => {
    setProcessedOpen(!processedOpen);
  };

  const callToggle = () => {
    setCallOpen(!callOpen)
  }

  const ongoingClipSelect = (clip) => {
    setSelectedOngoingClip(clip);
    aiToggle();
  };

  const processedClipSelect = (clip) => {
    setSelectedProcessedClip(clip);
    processedToggle();
  };

// =======
// >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://truad-dashboard-backend.onrender.com/allItems",
          {
            method: "GET",
          }
        );

        const data = await response.json();
        // const data2 = data.items.map((item) => item.location.split("?AWS")[0]);
        const data2 = data.items.map((elem) => ({
          ...elem,
          location: elem.location.split("?AWS")[0],
          name: elem.name.split("upload/")[1],
        }));
        setItems(data2);
        const processed = data2.filter((elem) => elem.blendFile);
        const ongoingClips = data2.filter(
          (elem) => elem.blend && !elem.blendFile
        );
        setOngoing(ongoingClips);
        // console.log("ongoing", ongoing);
        setProcessedClips(processed.slice(0, 2));
        // console.log("processed", processedClips);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="homepage-container">
      {isOpen && <PopUp togglePopup={togglePopup} />}
{/* <<<<<<< HEAD */}
      {availOpen && (
        <AIPopUp togglePopup={aiToggle} selectedClipId={selectedOngoingClip} />
      )}
      {processedOpen && (
        <ProcessedPopUp
          togglePopup={processedToggle}
          selectedClipId={selectedProcessedClip}
        />
      )}
      {callOpen && <CallPopUp togglePopup={callToggle}/>}
{/* // ======= */}
{/* // >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7 */}
      <div className="homepage-header">
        <div className="homepage-user-info">
          <p>{cookies.userdata.email}</p>
          <h4>Hi {cookies.userdata.username}</h4>
        </div>
        <div className="homepage-searchbar">
          <div className="homepage-searchbar-container">
            <div className="searchbar">
              <input type="text" placeholder="Search"></input>
              <img src={search}></img>
            </div>
            <div className="homepage-searchbar-icons">
              <img src={bell}></img>
              <img src={dark_mode}></img>
              <img src={info}></img>
              <div className="homepage-profile">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-info-container">
        <div className="homepage-info">
          <div className="homepage-infobox">
            <div className="homepage-infobox-icon">
              <CurrencyRupeeIcon />
            </div>
            <div className="homepage-infobox-info">
              <p>Payment Pending</p>
              <h4>32</h4>
            </div>
          </div>
        </div>
        <div className="homepage-info">
          <div className="homepage-infobox">
            <div className="homepage-infobox-icon">
              <CurrencyRupeeIcon />
            </div>
            <div className="homepage-infobox-info">
              <p>Cleared Invoices</p>
              <h4>89</h4>
            </div>
          </div>
        </div>
        <div className="homepage-call-btn" onClick={callToggle}>
          <div className="hompage-call-btnn-icon">
            <SupportAgentIcon />
          </div>
          <p>Call for Instant Support</p>
        </div>
        <div
          className="homepage-ticket-btn"
          onClick={() => navigate("/dashboard/raiseticket")}
        >
          <p>Have an Issue? Raise a ticket</p>
        </div>
        <div className="homepage-upload-btn" onClick={togglePopup}>
          <p>Upload New Materials</p>
        </div>
      </div>
      <div className="homepage-clips">
        <div className="clips-container">
          <p>Processed clips (2)</p>
{/* <<<<<<< HEAD
          {/* <div className="clips-row"> */}
          {/* <Slider {...sliderSettings}>
            {processedClips.map((item) => (
              <div
                className="clip-container"
                key={item._id}
                onClick={() => processedClipSelect(item)}
              >
======= */} 
          <Carousel showDots={false} responsive={responsive}>
            {
            processedClips.map((item) => (
              <div className="clip-container" key={item._id} onClick={() => processedClipSelect(item)}>
{/* >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7 */}
                <video autoPlay muted loop playsInline>
                  <source src={item.location} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="content">
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
{/* <<<<<<< HEAD
            </Slider>
          {/* </div> */}
{/* ======= */} 
          </Carousel>
{/* >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7 */}
        </div>

        <div className="clips-container">
          <p>AI detection ongoing (5)</p>
{/* <<<<<<< HEAD
          <Slider {...sliderSettings}>
            {ongoing.map((item, idx) => (
              <div className="clip-container" key={item._id}>
======= */}
          <Carousel showDots={false} responsive={responsive}>
            {ongoing.map((item) => (
              <div className="clip-container" key={item._id} style={{}}>
{/* >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7 */}
                <video autoPlay muted loop playsInline>
                  <source src={item.location} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="content">
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
{/* <<<<<<< HEAD
          </Slider>
======= */}
          </Carousel>
          
{/* >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7 */}
        </div>
      </div>
      <div className="homepage-available-clips">
        <div className="available-clips-container">
          <p>Available content clips (5)</p>
         
          <Carousel showDots={false} responsive={responsive1} style={{ '&.react-multi-carousel-track':{gap:"1rem"}
          }}>
            {items.map((item) => (
// <<<<<<< HEAD
//               <div
//                 className="available-clip-container"
//                 onClick={() => {
//                   ongoingClipSelect(item);
//                 }}
//               >
// =======
              <div className="clip-container" key={item._id} style={{width:"100%"}} onClick={() => {ongoingClipSelect(item)}}>
{/* >>>>>>> 9d2c4d12fb220a5b93a92f352ff7d2e868adb0f7 */}
                <video autoPlay muted loop playsInline>
                  <source src={item.location} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="content">
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="homepage-tickets-advertisements">
        <div className="homepage-tickets">
          <div className="homepage-tickets-header">
            <p>Tickets Raised (4)</p>
            <div className="more-btn">
              <img src={more}></img>
            </div>
          </div>
          <div className="homepage-tickets-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ticket 1</td>
                  <td>
                    <img src={pending} />
                    Pending
                  </td>
                  <td>18 Apr 2023</td>
                  <progress id="file" value="42" max="100">
                    {" "}
                    42%{" "}
                  </progress>
                </tr>
                <tr>
                  <td>Ticket 2</td>
                  <td>
                    <img src={pending} />
                    Pending
                  </td>
                  <td>22 April 2023</td>
                  <progress id="file" value="27" max="100">
                    {" "}
                    27%{" "}
                  </progress>
                </tr>
                <tr>
                  <td>Ticket 3</td>
                  <td>
                    <img src={pending} />
                    Pending
                  </td>
                  <td>12 Feb 2023</td>
                  <progress id="file" value="78" max="100">
                    {" "}
                    78%{" "}
                  </progress>
                </tr>
                <tr>
                  <td>Ticket 4</td>
                  <td>
                    <img src={done} />
                    Resolved
                  </td>
                  <td>15 Mar 2023</td>
                  <progress id="file" value="91" max="100">
                    {" "}
                    91%{" "}
                  </progress>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="homepage-tickets">
          <div className="homepage-tickets-header">
            <p>Clip Advertisements (4)</p>
            <div className="more-btn">
              <img src={more}></img>
            </div>
          </div>
          <div className="homepage-tickets-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Clip 1</td>
                  <td>
                    <img src={pending} />
                    Pending
                  </td>
                  <td>18 Apr 2023</td>
                  <progress id="file" value="42" max="100">
                    {" "}
                    42%{" "}
                  </progress>
                </tr>
                <tr>
                  <td>Clip 2</td>
                  <td>
                    <img src={pending} />
                    Pending
                  </td>
                  <td>22 April 2023</td>
                  <progress id="file" value="27" max="100">
                    {" "}
                    27%{" "}
                  </progress>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
