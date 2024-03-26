import {
  COMPLETED,
  CONFIRMED,
  NEW_CASE,
  REJECTED,
  WORK_IN_PROGRESS,
} from "../components/Chip";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const posts = [
  {
    id: 1,
    stage: NEW_CASE,
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    title: "Some Title",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2022-10-01",
    image: "https://picsum.photos/seed/1/3000/2000",
  },
  {
    id: 2,
    stage: WORK_IN_PROGRESS,
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Jane Smith",
    title: "Some Title",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    date: "2022-10-02",
    image: "https://picsum.photos/seed/2/3000/2000",
  },
  {
    id: 3,
    stage: COMPLETED,
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Alice Johnson",
    title: "Some Title",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    date: "2022-10-03",
    image: "https://picsum.photos/seed/3/3000/2000",
  },
  {
    id: 4,
    stage: REJECTED,
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Bob Williams",
    title: "Some Title",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    date: "2022-10-04",
    image: "https://picsum.photos/seed/4/3000/2000",
  },
  {
    id: 5,
    stage: NEW_CASE,
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Emma Davis",
    title: "Some Title",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    date: "2022-10-05",
    image: "https://picsum.photos/seed/5/3000/2000",
  },
  {
    id: 6,
    stage: CONFIRMED,
    profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Michael Wilson",
    title: "Some Title",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    date: "2022-10-06",
    image: "https://picsum.photos/seed/6/3000/2000",
  },
];

export const states = [
  {
    id: 0,
    stage: NEW_CASE,
    name: "New case",
  },
  {
    id: 1,
    stage: CONFIRMED,
    name: "Confirmed",
  },
  {
    id: 2,
    stage: WORK_IN_PROGRESS,
    name: "Work in progress",
  },
  {
    id: 3,
    stage: COMPLETED,
    name: "Completed",
  },
];
export const departmants = {
  Water: "https://img.icons8.com/?size=256&id=26264&format=png",
  Road: "https://img.icons8.com/?size=256&id=DKG5EanykiIZ&format=png",

  Railways: "https://img.icons8.com/?size=256&id=u1DomTMEHl1A&format=png",

  Electricity: "https://img.icons8.com/?size=256&id=69682&format=png",

  Eduction: "https://img.icons8.com/?size=256&id=12197&format=png",

  Medical: "https://img.icons8.com/?size=256&id=EtrvEl4qafJw&format=png",

  Others: "https://img.icons8.com/?size=256&id=13746&format=png",
};
