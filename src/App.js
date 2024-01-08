import "./App.css";
import hamburger from "./Components/Hamburg-icon.png";
import mail from "./Components/Message.png";
import chat from "./Components/Chat.png";
import meet from "./Components/sbMeet.png";
import gmailLogo from "./Components/GmailLogo.png";
import compose from "./Components/Compose.png";
import inbox from "./Components/inbox.png";
import star from "./Components/Star.png";
import snoozed from "./Components/snoozed.png";
import sent from "./Components/sent.png";
import draft from "./Components/drafts.png";
import more from "./Components/more.png";
import plus from "./Components/labels.png";
import questionmark from "./Components/header-questionmark.png";
import google from "./Components/google.png";
import settings from "./Components/settings.png";
import menu from "./Components/dottesSquare.png";
import chevrondown from "./Components/chevron-down.png";
import search from "./Components/search.png";
import filter from "./Components/filter.png";
import back from "./Components/left-arrow.png";
import Download from "./Components/downlload.png";
import exclamation from "./Components/exclamation.png";
import dele from "./Components/delete.png";
import messagedot from "./Components/message-dot.png";
import clock from "./Components/clock.png";
import checkplus from "./Components/check.png";
import forwfolder from "./Components/forward.png";
import send from "./Components/send.png";
import threedot from "./Components/3-dots-vertical.png";
import xcross from "./Components/cross.png";
import dp from "./Components/dp.png";
import chevDown from "./Components/chevrondown.png";
import attach from "./Components/paperclip-sideways.png";
import reply from "./Components/lef-arrow-curved.png";
import options from "./Components/3-dots-vertical.png";
import roundExclamation from "./Components/exclamationRound.png";
import fileAttach from "./Components/Invite.png";
import replyall from "./Components/reply-all.png";
import forward from "./Components/forward-arrow.png";
import calendar from "./Components/google-calendar-logo.png";
import gkeep from "./Components/Tab-Keep.png";
import tasks from "./Components/Tab-Tasks.png";
import contacts from "./Components/Tab-Contacts.png";
import zoom from "./Components/Tab-Zoom.png";
import add from "./Components/Tab-GetAdd-ons.png";
import axios from "axios";
import puppeteer from "puppeteer";
import { useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { createRef } from "react";
import { useEffect } from "react";
import { v4 as uuidv4, v4 } from "uuid";
function App() {
  const [file, setFile] = useState(null);
  const [emailId, setEmailId] = useState("");

  const [uid, setuid] = useState();
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => {
    takeScreenshot(ref.current);

    // download(image, { name: "lorem-ipsum", extension: "png" });
  };
  const download = (image, { name = "img", extension = "png" } = {}) => {
    const a = document.createElement("a");

    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
    console.log("adsdsdsds", a);
    setTimeout(() => {
      postData(a)
    }, 10000);
   
  };

  const takeScreenshotP = async () => {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the React app URL
    await page.goto('http://localhost:3000'); // Update with your React app URL

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });

    // Close the browser
    await browser.close();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email_id", email_id);

    console.log("file", file);
    
    try {
      const response = await fetch("http://3.64.170.40:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle success response
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const postData = async (a) => {
    try {
      const url = "http://3.64.170.40:8000/upload";
      const formData = new FormData();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${Token}`,
        },
      };
      const img = uid + ".png";
      const fileInputPath = "/Users/ammararif/Downloads/" + img;
      const file = new File([fileInputPath], img);
      console.log("file", file);
      
      formData.append("file", file);
      formData.append("email_id", email_id);
return
      const result = await axios.post(url, formData, config);
      console.log("res", result.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (image) {
      download(image, { name: "lorem-ipsum", extension: "png" });
    }
  }, [image]);

  const [email_id, setemail_id] = useState();
  const [receiver_body, setreceiver_body] = useState();
  const [receiver_date, setreceiver_date] = useState();
  const [receiver_email, setreceiver_email] = useState();
  const [receiver_name, setreceiver_name] = useState();
  const [sender_body, setsender_body] = useState();
  const [sender_date, setsender_date] = useState();
  const [sender_email, setsender_email] = useState();
  const [sender_name, setsender_name] = useState();
  const [subject, setsubject] = useState();
  const [thread_id, setthread_id] = useState();

  function removeREPrefix(subject) {
    // Check if the string starts with "RE:"
    if (String(subject).startsWith("Re:")) {
      // If yes, remove "RE:" and any following whitespaces
      console.log("here");
      return subject.substring(3).trim();
    }
    // If not, return the original string
    return subject;
  }

  function convertDateFormat(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Parse the input date string
    const parsedDate = new Date(inputDate);

    // Extract components
    const year = parsedDate.getFullYear();
    const month = months[parsedDate.getMonth()];
    const day = parsedDate.getDate();
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the formatted date string
    const formattedDate = `${month} ${day}, ${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;

    return formattedDate;
  }

  const getData = async () => {
    try {
      const url = "http://3.64.170.40:8000/get-payload";
      const config = {
        headers: {
          // Authorization: `Bearer ${Token}`,
        },
      };
      const result = await axios.get(url, config);
      console.log("res.data", result.data[0]);
      let res = result.data[0];
      setemail_id(res.email_id);
      setreceiver_body(res.receiver_body);
      let receiverDate = convertDateFormat(res.receiver_date);
      setreceiver_date(receiverDate);
      setreceiver_email(res.receiver_email);
      setreceiver_name(res.receiver_name);
      setsender_body(res.sender_body);
      let senderDate = convertDateFormat(res.sender_date);

      setsender_date(senderDate);
      setsender_email(res.sender_email);
      setsender_name(res.sender_name);
      let Subjecct = removeREPrefix(res.subject);

      setsubject(Subjecct);
      setthread_id(res.thread_id);
      setuid(uuidv4());
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <div ref={ref} className=" flex  w-[100vw] h-[100vh]">
        {/* sidebar1 */}
        <div className=" bg-[#EAF1FB] flex flex-col items-center  w-[4.7%]">
          <img className=" max-w-[70px] h-[64px]" src={hamburger} />
          <img className=" max-w-[70px] h-[64px]" src={mail} />
          <img className=" max-w-[70px] h-[64px]" src={chat} />
          <img className=" max-w-[70px] h-[64px]" src={meet} />
        </div>
        {/* sidebar2 */}
        <div className=" bg-[#f7f8fc] flex flex-col w-[17.8%]  ">
          <img
            onClick={() => getData()}
            className=" w-[109px] h-[40px] mt-3 ml-4 cursor-pointer"
            src={gmailLogo}
          />
          <div className=" flex items-center  bg-[#C2E7FF] h-[56px] rounded-2xl ml-4 mr-24 my-1 mt-[8%]">
            <img className=" w-[52px] h-[24px]  " src={compose} />
            <div className=" pb-3">Compose</div>
          </div>
          <div className=" mt-4 gap-2">
            <div className=" flex bg-[#d3e3fd] mx-4 w-[232px] h-[32px] items-center justify-between rounded-3xl px-3 ">
              <div className=" flex items-center">
                <img className=" w-[20px] h-[20px]  mr-[16px] " src={inbox} />
                <div className=" font-semibold text-sm pb-3">Inbox</div>
              </div>
              <div className=" pr-3 pb-3">11</div>
            </div>
            <div className=" flex  mx-4 w-[232px] h-[32px] items-center rounded-3xl px-3 ">
              <img className=" w-[20px] h-[20px]  mr-[16px] " src={star} />
              <div className="  text-sm pb-3">Starred</div>
            </div>
            <div className=" flex  mx-4 w-[232px] h-[32px] items-center rounded-3xl px-3 ">
              <img className=" w-[20px] h-[20px]  mr-[16px] " src={snoozed} />
              <div className="  text-sm pb-3">Snoozed</div>
            </div>
            <div className=" flex  mx-4 w-[232px] h-[32px] items-center rounded-3xl px-3 ">
              <img className=" w-[20px] h-[20px]  mr-[16px] " src={sent} />
              <div className="  text-sm pb-3">Sent</div>
            </div>
            <div className=" flex  mx-4 w-[232px] h-[32px] items-center justify-between rounded-3xl px-3 ">
              <div className=" flex items-center">
                <img className=" w-[20px] h-[20px]  mr-[16px] " src={draft} />
                <div className=" font-semibold text-sm pb-3">Drafts</div>
              </div>
              <div className=" pr-3 pb-3">1</div>
            </div>
            <div className=" flex  mx-4 w-[232px] h-[32px] items-center rounded-3xl px-3 ">
              <img className=" w-[20px] h-[20px]  mr-[16px] " src={more} />
              <div className=" text-sm pb-3">More</div>
            </div>
            <div className=" flex  mx-4 w-[232px] h-[32px] items-center justify-between rounded-3xl px-3 mt-[20px] ">
              <div className=" font-semibold pb-3">Labels</div>
              <img className=" w-[20px] h-[20px] mr-3 " src={plus} />
            </div>
          </div>
        </div>
        {/* coloumn 3 */}
        <div className=" w-full h-full flex flex-col bg-[#f7f8fc] border-l">
          {/* header */}
          <div className=" w-full flex flex-row items-center  h-[64px] justify-between">
            <div className=" w-[720px] h-[48px] bg-[#EAF1FB] border rounded-full flex items-center justify-between px-3">
              <div className=" flex h-full items-center gap-2">
                <img src={search} className=" h-6 w-6" />
                <div className=" pb-3">Search in mail</div>
              </div>
              <img src={filter} className=" h-6 w-6" />
            </div>

            <div className=" flex flex-row items-center pr-3 gap-3 ">
              {/* Active Button */}
              <div className=" flex flex-row w-[100px] px-1 h-[48px] bg-[#EAF1FB] rounded-full items-center justify-evenly">
                <div className=" w-3 h-3 rounded-full bg-[#1E8E3E]"></div>
                <div className="   pb-4">Active</div>
                <img src={chevrondown} className=" w-5 h-5 " />
              </div>

              <img src={questionmark} className=" w-[24px]  h-[24px] " />
              <img src={settings} className=" w-[24px]  h-[24px] " />
              <img src={menu} className=" w-[24px]  h-[24px] " />

              <div className=" flex flex-row items-center border rounded-lg h-[48px] w-[134px] justify-center gap-2 ml-[1%] bg-white">
                <img src={google} className=" w-[78px] h-[25.77px]" />
                <div className=" w-[32px] h-[32px] rounded-full flex  justify-center items-center pb-3 bg-green-900 text-white">
                  <dv>S</dv>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full h-[92vh]  flex flex-row ">
            {/* email body */}

            <div className=" bg-white w-[95%] rounded-3xl flex flex-col pr-10">
              {/* text-area icon-row */}
              <div className=" flex flex-row h-5 w-full mt-4 px-4">
                <img src={back} className=" w-5 h-5" />
                <div className=" flex border-r pl-7 ">
                  <img src={Download} className=" w-5 h-5 mx-3" />
                  <img src={exclamation} className=" w-5 h-5 mx-3" />
                  <img src={dele} className=" w-5 h-5 ml-3 mr-6" />
                </div>
                <div className=" flex border-r ">
                  <img src={messagedot} className=" w-5 h-5 ml-6 mr-3" />
                  <img src={clock} className=" w-5 h-5 mx-3" />
                  <img src={checkplus} className=" w-5 h-5  mr-6 ml-3" />
                </div>
                <div className=" flex ">
                  <img src={forwfolder} className=" w-5 h-5 ml-6 mr-3" />
                  <img src={send} className=" w-5 h-5 mx-3" />
                  <img src={threedot} className=" w-5 h-5 mx-3" />
                </div>
              </div>
              {/* Subjec Text */}
              <div className=" flex pt-9  items-center">
                <div className=" pl-20 text-[21px] pb-3">{subject}</div>
                {/* inbox option */}
                <div className=" flex mt-3  w-[55px] h-4 bg-[#DDDDDD] ml-2 text-[#666] rounded items-center  justify-center gap-1  text-xs">
                  <div className=" pb-3"> Inbox</div>
                  <img src={xcross} className=" w-2 h-2 " />
                </div>
              </div>

              {/* DP name option */}
              <div className=" flex pt-6 border-b pb-4   justify-between">
                <div className=" flex items-center h-[40px]">
                  <div className=" flex w-[80px]">
                    <img src={dp} className=" ml-5 w-10 h-10 " />
                  </div>

                  <div className=" flex flex-col pb-4">
                    <div className="flex flex-row items-center">
                      <div className=" font-semibold">{sender_name}</div>
                      <div className=" text-[#5E5E5E] text-xs pl-2">
                        {/* {"<"}{sender_email}{">"} */}
                      </div>
                    </div>
                    <div className=" flex flex-row items-center">
                      <div className="text-[#5E5E5E] text-sm">
                        {sender_body}
                      </div>
                      {/* <img src={chevDown} className=" w-3 h-3 " /> */}
                    </div>
                  </div>
                </div>
                <div className=" flex text-xs  h-5 items-center">
                  <img className=" h-5 w-5 mr-1" src={attach} />
                  <div className=" pb-4">
                    {sender_date}
                    {" (4 hours ago)"}
                  </div>

                  <img className=" h-6 w-5 ml-5 pb-1" src={star} />
                  {/* <img className=" h-5 w-5 ml-5" src={reply} /> */}
                  {/* <img className=" h-5 w-5 ml-5" src={options} /> */}
                </div>
              </div>

              {/* textbody */}

              {/* <div className=" w-full flex  pl-20  pt-2 text-sm border-b  pb-4">
              <div>Jman is  gay</div>
            </div> */}
              {/* remove the body above */}
              <div className=" flex pt-6   justify-between">
                <div className=" flex items-center h-[40px]">
                  <div className=" flex w-[80px] ">
                    <img src={dp} className=" ml-5 w-10 h-10 " />
                  </div>

                  <div className=" flex flex-col   pb-4">
                    <div className="flex flex-row items-center">
                      <div className=" font-semibold">{receiver_name}</div>
                      <div className=" text-[#5E5E5E] text-xs pl-2">
                        {"<"}
                        {receiver_email}
                        {">"}
                      </div>
                    </div>
                    <div className=" flex flex-row items-center">
                      <div className="text-[#5E5E5E] text-xs">to me </div>
                      <img src={chevDown} className=" w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
                <div className=" flex text-xs  h-5 items-center">
                  <img className=" h-5 w-5 mr-1" src={attach} />
                  <div className=" pb-4">
                    {receiver_date}
                    {" (4 hours ago)"}
                  </div>
                  <img className=" h-6 w-5 ml-5 pb-1" src={star} />
                  <img className=" h-6 w-5 ml-5 pb-1" src={reply} />
                  <img className=" h-5 w-5 ml-5" src={options} />
                </div>
              </div>
              <div className=" w-full flex  pl-20  pt-2 text-sm  ">
                <div>{receiver_body}</div>
              </div>
              {/*footer  */}
              {/* <div className=" flex w-full items-center gap-5 pl-20">
              <div className="flex items-center font-semibold text-sm">
                One attachment
              </div>
              <div className=" w-1 h-1 bg-black rounded-full"></div>
              <div className="flex items-center gap-1">
                <div className=" text-[#222] text-sm">Scanned by Gmail</div>
                <img src={roundExclamation} className=" w-4 h-4" />
              </div>
            </div> */}
              {/* <div className=" flex w-full items-center gap-5 pl-20 mt-3">
              <img src={fileAttach} className=" w-4 h-4" />
              <div className=" text-sm">Invite.ics</div>
              <div className=" text-sm text-[#1155CC]">Download</div>
            </div> */}
              <div className=" flex flex-row mt-10">
                <div className="flex border border-black items-center justify-center h-[36px] w-[113px] gap-2 rounded-3xl ml-20 ">
                  <img src={reply} className=" w-5 h-5" />
                  <div className=" pb-3">Reply</div>
                </div>
                {/* <div className="flex border border-black items-center justify-center h-[36px] w-[113px] gap-2 rounded-3xl ml-5 ">
                <img src={replyall} className=" w-5 h-5" />
                <div>Reply all</div>
              </div> */}
                <div
                  onClick={() => getImage()}
                  className="flex border cursor-pointer border-black items-center justify-center h-[36px] w-[113px] gap-2 rounded-3xl ml-5 "
                >
                  <img src={forward} className=" w-5 h-5" />
                  <div className=" pb-3">Forward</div>
                </div>
              </div>
            </div>

            {/* right sidebar */}
            <div className=" w-[5%] flex flex-col items-center pt-3">
              <div className=" border-b w-[40px] flex flex-col gap-5">
                <img src={calendar} className=" w-[40px] h-[40px]" />
                <img src={gkeep} className=" w-[40px] h-[40px]" />
                <img src={tasks} className=" w-[40px] h-[40px]" />
                <img src={contacts} className=" w-[40px] h-[40px] mb-5" />
              </div>
              <img src={zoom} className=" w-[40px] h-[40px] mt-5" />
              <img src={add} className=" w-[40px] h-[40px] mt-5" />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Image</button>
        <button onClick={()=>takeScreenshotP()}>Puppeteer SS</button>

      </div>
    </div>
  );
}

export default App;
