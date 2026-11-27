// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#2563EB",
//         tabBarInactiveTintColor: "#94A3B8",
//         tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Tests",
//           tabBarIcon: ({ color, size }) => <Ionicons name="flask-outline" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="my-bookings"
//         options={{
//           title: "My Bookings",
//           tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }


import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tests",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="flask-outline"
              size={size}
              color={String(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="my-bookings"
        options={{
          title: "My Bookings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              size={size}
              color={String(color)}
            />
          ),
        }}
      />
    </Tabs>
  );
}
