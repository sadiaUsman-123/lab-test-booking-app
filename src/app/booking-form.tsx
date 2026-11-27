
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  useLocalSearchParams,
  useRouter,
  Stack,
} from "expo-router";

import { addBooking, getTestById } from "../services/testService";
import { LabTest } from "../types/test";

function validate(name: string, phone: string, date: string) {
  const errors: {
    name?: string;
    phone?: string;
    date?: string;
  } = {};

  if (!name.trim()) {
    errors.name = "Patient name is required";
  }

  if (!/^\d{11}$/.test(phone)) {
    errors.phone = "Phone number must be 11 digits";
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

  if (!match) {
    errors.date = "Use format YYYY-MM-DD";
  } else {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const picked = new Date(year, month - 1, day);

    if (
      picked.getFullYear() !== year ||
      picked.getMonth() !== month - 1 ||
      picked.getDate() !== day
    ) {
      errors.date = "Please enter a valid date";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (picked < today) {
        errors.date = "Date cannot be in the past";
      }
    }
  }

  return errors;
}

export default function BookingFormScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [test, setTest] = useState<LabTest>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    ReturnType<typeof validate>
  >({});

  useEffect(() => {
    if (id) {
      getTestById(id)
        .then(setTest)
        .catch(() => {
          Alert.alert("Error", "Could not load test details.");
        });
    }
  }, [id]);

  const handleSubmit = async () => {
    const result = validate(name, phone, date);

    setErrors(result);

    if (Object.keys(result).length > 0) return;

    if (!test) {
      Alert.alert("Please wait", "Test details are loading.");
      return;
    }

    try {
      setLoading(true);

      await addBooking({
        testId: test.id,
        testName: test.name,
        price: test.price,
        patientName: name.trim(),
        phone,
        date,
      });

      Alert.alert(
        "Booking Successful!",
        "Your lab test has been booked.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/my-bookings" as any),
          },
        ]
      );
    } catch {
      Alert.alert("Error", "Could not save booking. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hide default Expo Router header */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "bottom"]}
      >
        <StatusBar
           barStyle="dark-content"
           hidden={false}
/>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>{"‹"}</Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            Book Lab Test
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>
            Complete Your Booking
          </Text>

          <Text style={styles.testName}>
            {test?.name || "Loading test details..."}
          </Text>

          {test && (
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>
                Test Price
              </Text>
              <Text style={styles.price}>
                Rs. {test.price}
              </Text>
            </View>
          )}

          <Text style={styles.label}>Patient Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
          />

          {errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}

          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter 11 digit phone number"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={11}
            value={phone}
            onChangeText={setPhone}
          />

          {errors.phone && (
            <Text style={styles.error}>{errors.phone}</Text>
          )}

          <Text style={styles.label}>Booking Date</Text>

          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#94A3B8"
            value={date}
            onChangeText={setDate}
          />

          {errors.date && (
            <Text style={styles.error}>{errors.date}</Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Confirm Booking
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
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

  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
  },

  testName: {
    fontSize: 17,
    color: "#2563EB",
    fontWeight: "600",
    marginBottom: 20,
  },

  priceBox: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 22,
  },

  priceLabel: {
    fontSize: 14,
    color: "#64748B",
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 5,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#1E293B",
    backgroundColor: "#FFFFFF",
  },

  error: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 5,
  },

  button: {
    backgroundColor: "#2563EB",
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});



