
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  useLocalSearchParams,
  useRouter,
  Stack,
} from "expo-router";

import { getTestById } from "../services/testService";
import { LabTest } from "../types/test";

export default function TestDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [test, setTest] = useState<LabTest>();

  useEffect(() => {
    if (id) {
      getTestById(id).then(setTest).catch(() => {
        setTest(undefined);
      });
    }
  }, [id]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <StatusBar
          barStyle="dark-content"
        />

        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>{"‹"}</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Test Details</Text>
        </View>

        {!test ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.loadingText}>
              Loading test details...
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.name}>{test.name}</Text>

            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Test Price</Text>
              <Text style={styles.price}>Rs. {test.price}</Text>
            </View>

            <Text style={styles.sectionTitle}>
              About This Test
            </Text>

            <Text style={styles.desc}>
              {test.description}
            </Text>

            <Pressable
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/booking-form" as any,
                  params: { id: test.id },
                })
              }
            >
              <Text style={styles.buttonText}>
                Book This Test
              </Text>
            </Pressable>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  backArrow: {
    fontSize: 38,
    color: "#2563EB",
    lineHeight: 42,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1E293B",
  },

  content: {
    flexGrow: 1,
    padding: 22,
    paddingTop: 28,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#64748B",
  },

  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 22,
  },

  priceBox: {
    backgroundColor: "#EFF6FF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 28,
  },

  priceLabel: {
    fontSize: 14,
    color: "#64748B",
  },

  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },

  desc: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 25,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
