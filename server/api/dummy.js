
const testTopicData = [
{
id: 61781,
name: "UX Design",
group_count: 2379
},
{
id: 917292,
name: "UI/UX design",
group_count: 424
},
{
id: 437352,
name: "Lean UX",
group_count: 371
},
{
id: 96788,
name: "UI/UX",
group_count: 259
},
{
id: 996032,
name: "UX/UI",
group_count: 184
},
{
id: 480492,
name: "UX Research",
group_count: 134
},
{
id: 691612,
name: "Agile UX",
group_count: 118
},
{
id: 691622,
name: "UX Technology",
group_count: 63
},
{
id: 738272,
name: "UX and sustainable web design",
group_count: 36
},
{
id: 1213722,
name: "Windows 8 UX",
group_count: 1
}
]

const testGroupData =[
{
id: 20365815,
name: "Python + Data Science",
urlname: "python-plus-data-science",
members: 5589,
next_event: {
id: "253615580",
name: "Introduction to Scala",
yes_rsvp_count: 46,
time: 1534977900000,
utc_offset: -14400000
}
},
{
id: 19096407,
name: "NYC Scrum User Group",
urlname: "NYC-Scrum-User-Group",
members: 1781,
next_event: {
id: "mgjzfpyxlbvb",
name: "Highlights from Agile2018",
yes_rsvp_count: 99,
time: 1534456800000,
utc_offset: -14400000
}
},
{
id: 18657625,
name: "ChickTech: New York",
urlname: "ChickTech-NewYork",
members: 567,
next_event: {
id: "zjspwpyxlbfc",
name: "ChickTech NY: Happy Hour Meetup",
yes_rsvp_count: 20,
time: 1535063400000,
utc_offset: -14400000
}
},
{
id: 6862722,
name: "NY Health Tech Startups",
urlname: "NY-Healthtech-startups",
members: 776,
next_event: {
id: "253679391",
name: "Summer Health Tech Mixer",
yes_rsvp_count: 30,
time: 1536186600000,
utc_offset: -14400000
}
},
{
id: 2570812,
name: "NYCHTML5",
urlname: "nychtml5",
members: 3015,
next_event: {
id: "253309798",
name: "[NYCHTML5 August] - PostCSS Way & Using Typescript As Your Only Build Tool",
yes_rsvp_count: 24,
time: 1534802400000,
utc_offset: -14400000
}
},
{
id: 29039155,
name: "NYCCHAOS",
urlname: "NYCCHAOS",
members: 80,
next_event: {
id: "252752175",
name: "Intro to Chaos Engineering",
yes_rsvp_count: 17,
time: 1534975200000,
utc_offset: -14400000
}
},
{
id: 28200946,
name: "Chainhaus",
urlname: "Chainhaus",
members: 107,
next_event: {
id: "250694773",
name: "Full Day Masterclass: Blockchain, Ethereum, HyperLedger & Smart Contracts",
yes_rsvp_count: 11,
time: 1534770000000,
utc_offset: -14400000
}
},
{
id: 29426477,
name: "Digital Transformation: Mapping the Software-Defined Future",
urlname: "beingdigital",
members: 55,
next_event: {
id: "253434228",
name: "An evening with Postgres: future of enterprise and open-source databases",
yes_rsvp_count: 1,
time: 1538692200000,
utc_offset: -14400000
}
},
{
id: 18638940,
name: "NY Women in Tech",
urlname: "nywomentech",
members: 353,
next_event: {
id: "251716436",
name: "Wine Tasting & Empanadas",
yes_rsvp_count: 4,
time: 1537221600000,
utc_offset: -14400000
}
}
]


const eventData = {
created: 1532704306000,
duration: 9000000,
id: "253209051",
name: "Exploring Micronaut! - A New Modern Microservice Centric Java Framework",
rsvp_limit: 80,
rsvp_sample: [],
status: "upcoming",
time: 1534458600000,
local_date: "2018-08-16",
local_time: "17:30",
updated: 1532707937000,
utc_offset: -18000000,
waitlist_count: 0,
yes_rsvp_count: 25,
venue: {
id: 24772457,
name: "WeWork Kinzie",
lat: 41.88947677612305,
lon: -87.62890625,
repinned: false,
address_1: " 20 W Kinzie St, Chicago, IL 60654",
city: "Chicago",
country: "us",
localized_country_name: "USA",
zip: "",
state: "IL"
},
group: {
created: 1483391222000,
name: "Chicago Microservices Meetup",
id: 21745183,
join_mode: "open",
lat: 41.880001068115234,
lon: -87.63999938964844,
urlname: "Chicago-Microservices-Meetup",
who: "Members",
localized_location: "Chicago, IL",
region: "en_US",
timezone: "US/Central"
},
link: "https://www.meetup.com/Chicago-Microservices-Meetup/events/253209051/",
description: "<p>TOPIC:<br/>Exploring Micronaut! - A New Modern Microservice Centric Java Framework</p> <p>OVERVIEW:<br/>We are excited to have David Estes, the VP of Engineering from Morpheus Data to Explore Micronaut!</p> <p>Micronaut is making waves and turning heads in the java community as it challenges what was believed to be the norm of java applications (memory intensive and bulky). Now a framework exists with all the power of Spring but a fraction of the startup time (subsecond) and memory (&lt;10MB). This talk covers some of the native features provided by micronaut and how they benefit the microservice oriented organization.</p> <p>We will have a Presentation, Q&amp;A, and Networking – Food &amp; Beverages provided!</p> <p>DATE: Thursday, August 16th<br/>TIME: 6pm – 8pm (doors open at 5:30pm)<br/>LOCATION: WeWork, Kinzie<br/>20 West Kinzie St.<br/>17th Floor<br/>Chicago, IL 60654</p> <p>* Please head up to the 17th Floor, and let them know you are attending the Microservices Meetup! Bring a photo ID for security desk.</p> <p>SPEAKER:<br/>David Estes – VP of Engineering, Morpheus Data</p> <p>ABOUT OUR HOST:<br/>Morpheus Data is a leading cloud application management and orchestration platform designed from the ground up for truly agnostic cloud management.</p> <p>Morpheus gives developers, IT managers, and DevOps professionals full control over both VM and container-based systems across any cloud or infrastructure.</p> <p>Finally, a single platform provides complete application lifecycle management, including one-click provisioning, built-in backup, logging, monitoring, reporting, and access control. Morpheus offers more built-in integrations and faster time-to-value than any other cloud orchestration or management platform on the market.</p> ",
how_to_find_us: "17th Floor- You can ask the front desk to point you to the Microservices MeetUp",
visibility: "public",
web_actions: {
calendar_export_google: "http://www.google.com/calendar/event?location=WeWork+Kinzie+-++20+W+Kinzie+St%2C+Chicago%2C+IL+60654+-+Chicago%2C+IL%2C+us&action=TEMPLATE&sprop=name%3AChicago+Microservices+Meetup&sprop=website%3Ahttps%3A%2F%2Fwww.meetup.com%2FChicago-Microservices-Meetup%2Fevents%2F253209051&details=For+full+details%2C+including+the+address%2C+and+to+RSVP+see%3A+https%3A%2F%2Fwww.meetup.com%2FChicago-Microservices-Meetup%2Fevents%2F253209051%0A%0ATOPIC%3A%0AExploring+Micronaut%21+-+A+New+Modern+Microservice+Centric+Java+Framework%0A%0AOVERVIEW%3A%0AWe+are+exc...&text=Exploring+Micronaut%21+-+A+New+Modern+Microservice+Centric+Java+Framework&dates=20180816T223000Z%2F20180817T010000Z",
invite: "https://www.meetup.com/Chicago-Microservices-Meetup/invite",
calendar_export_yahoo: "http://calendar.yahoo.com/?in_loc=WeWork+Kinzie+-++20+W+Kinzie+St%2C+Chicago%2C+IL+60654+-+Chicago%2C+IL%2C+us&v=60&VIEW=d&TYPE=20&TITLE=Exploring+Micronaut%21+-+A+New+Modern+Microservice+Centric+Java+Framework&ST=20180816T223000Z&DUR=0230&URL=https%3A%2F%2Fwww.meetup.com%2FChicago-Microservices-Meetup%2Fevents%2F253209051&DESC=For+full+details%2C+including+the+address%2C+and+to+RSVP+see%3A+https%3A%2F%2Fwww.meetup.com%2FChicago-Microservices-Meetup%2Fevents%2F253209051%0A%0ATOPIC%3A%0AExploring+Micronaut%21+-+A+New+Modern+Microservice+Centric+Java+Framework%0A%0AOVERVIEW%3A%0AWe+are+exc...",
calendar_export_ical: "https://www.meetup.com/Chicago-Microservices-Meetup/events/253209051/ical/Exploring+Micronaut%2521+-+A+New+Modern+Microservice+Centric+Java+Framework.ics",
calendar_export_outlook: "https://www.meetup.com/Chicago-Microservices-Meetup/events/253209051/ical/Exploring+Micronaut%2521+-+A+New+Modern+Microservice+Centric+Java+Framework.ics"
},
past_event_count_inclusive: 5,
event_hosts: [
{
id: 200296836,
name: "Adam Yaws",
intro: "",
photo: {
id: 276663405,
highres_link: "https://secure.meetupstatic.com/photos/member/d/4/d/highres_276663405.jpeg",
photo_link: "https://secure.meetupstatic.com/photos/member/d/4/d/member_276663405.jpeg",
thumb_link: "https://secure.meetupstatic.com/photos/member/d/4/d/thumb_276663405.jpeg",
type: "member",
base_url: "https://secure.meetupstatic.com"
},
host_count: 0,
join_date: 1524590458000
},
{
id: 225408165,
name: "George Nassopoulos",
intro: "",
photo: {
id: 265921989,
highres_link: "https://secure.meetupstatic.com/photos/member/7/c/5/highres_265921989.jpeg",
photo_link: "https://secure.meetupstatic.com/photos/member/7/c/5/member_265921989.jpeg",
thumb_link: "https://secure.meetupstatic.com/photos/member/7/c/5/thumb_265921989.jpeg",
type: "member",
base_url: "https://secure.meetupstatic.com"
},
host_count: 0,
join_date: 1526937704000
},
{
id: 238112211,
name: "Katherine Zera",
intro: "",
photo: {
id: 271242041,
highres_link: "https://secure.meetupstatic.com/photos/member/a/4/3/9/highres_271242041.jpeg",
photo_link: "https://secure.meetupstatic.com/photos/member/a/4/3/9/member_271242041.jpeg",
thumb_link: "https://secure.meetupstatic.com/photos/member/a/4/3/9/thumb_271242041.jpeg",
type: "member",
base_url: "https://secure.meetupstatic.com"
},
role: "coorganizer",
host_count: 3,
join_date: 1507152171000
},
{
id: 241320462,
name: "Jurek",
intro: "",
role: "coorganizer",
host_count: 3,
join_date: 1517428589000
}
]
}
