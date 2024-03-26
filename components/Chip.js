// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const Timeline = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.timeline}>
//         <View style={styles.dot} />
//         <View style={styles.line} />
//         <View style={styles.dot} />
//         <View style={styles.line} />
//         <View style={styles.dot} />
//         <View style={styles.line} />
//         <View style={styles.dot} />
//         <View style={styles.line} />
//         <View style={styles.dot} />
//       </View>
//       <View style={styles.stageContainer}>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>New Case</Text>
//         </View>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>Confirmed</Text>
//         </View>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>Completed</Text>
//         </View>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>Rejected</Text>
//         </View>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>Work In Progress</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   timeline: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "black",
//     marginHorizontal: 5,
//   },
//   line: {
//     flex: 1,
//     height: 2,
//     backgroundColor: "black",
//   },
//   stageContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   stage: {
//     alignItems: "center",
//   },
//   stageText: {
//     fontSize: 12,
//     marginTop: 5,
//   },
// });

// export default Timeline;
import React from "react";
import { View, StyleSheet } from "react-native";
import RNText from "./RNText";

const Chip = ({ stage }) => {
  let chipColor;
  switch (stage) {
    case NEW_CASE:
      //pnik flavor color
      chipColor = "#2196F3";
      break;
    case CONFIRMED:
      chipColor = "#FF9800";
      break;
    case COMPLETED:
      chipColor = "#4aaf57";
      break;
    case REJECTED:
      chipColor = "#FF2E63";
      break;
    case WORK_IN_PROGRESS:
      chipColor = "#8E3fff";
      break;
    default:
      chipColor = "#9E9E9E";
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: chipColor,
        },
      ]}
    >
      <RNText className="text-sm" style={styles.text}>
        {stage}
      </RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    letterSpacing: 0.5,
  },
});

export default Chip;

//create constants for the stages
export const NEW_CASE = "New case";
export const CONFIRMED = "Confirmed";
export const COMPLETED = "Completed";
export const REJECTED = "Rejected";
export const WORK_IN_PROGRESS = "Work in progress";
