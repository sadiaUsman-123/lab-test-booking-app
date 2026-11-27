
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { getBookings } from "../../services/testService";
import { Booking } from "../../types/test";

export default function MyBookingsScreen() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBookings();
      setBookings(data);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, [loadBookings])
  );
  

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        barStyle="dark-content"
        //backgroundColor="#F8FAFC"
      />

      <View style={styles.header}>
        <Text style={styles.heading}>My Bookings</Text>
        <Text style={styles.subtitle}>
          View your booked laboratory tests
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>
            Loading your bookings...
          </Text>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Text style={styles.iconText}>+</Text>
          </View>

          <Text style={styles.emptyTitle}>
            No Bookings Yet
          </Text>

          <Text style={styles.emptyDescription}>
            You haven't booked any lab tests yet.
            Book your first test to see it here.
          </Text>

          <Pressable
            style={styles.bookButton}
            onPress={() => router.push("/" as any)}
          >
            <Text style={styles.bookButtonText}>
              Explore Lab Tests
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.testIcon}>
                  <Text style={styles.testIconText}>
                    LAB
                  </Text>
                </View>

                <View style={styles.testInfo}>
                  <Text style={styles.testName}>
                    {item.testName}
                  </Text>

                  <Text style={styles.bookingNumber}>
                    Booking #{index + 1}
                  </Text>
                </View>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    Booked
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Patient Name
                </Text>
                <Text style={styles.detailValue}>
                  {item.patientName}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Phone Number
                </Text>
                <Text style={styles.detailValue}>
                  {item.phone}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Booking Date
                </Text>
                <Text style={styles.detailValue}>
                  {item.date}
                </Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>
                  Total Amount
                </Text>

                <Text style={styles.price}>
                  Rs. {item.price}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 18,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
  },

  list: {
    padding: 18,
    paddingBottom: 35,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  testIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  testIconText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2563EB",
  },

  testInfo: {
    flex: 1,
    marginLeft: 12,
  },

  testName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },

  bookingNumber: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#15803D",
    fontSize: 11,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  detailLabel: {
    fontSize: 13,
    color: "#64748B",
  },

  detailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 10,
  },

  priceContainer: {
    backgroundColor: "#EFF6FF",
    padding: 13,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priceLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2563EB",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#64748B",
    marginTop: 12,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 35,
  },

  emptyIcon: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  iconText: {
    fontSize: 40,
    color: "#2563EB",
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1E293B",
  },

  emptyDescription: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 22,
  },

  bookButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
  },

  bookButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});


