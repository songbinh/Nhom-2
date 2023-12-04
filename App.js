import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(12);
  const [currentYear, setCurrentYear] = useState(2023);
  const [dayInfo, setDayInfo] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleDayPress = (day) => {
    const dayKey = `${currentYear}-${currentMonth}-${day}`;
    setSelectedDay(dayKey);
    setDayInfo(prev => ({ ...prev, [dayKey]: prev[dayKey] || '' }));
  };

  const markDay = () => {
    if (selectedDay) {
      setDayInfo({ ...dayInfo, [selectedDay]: 'Đánh dấu' });
      setSelectedDay(null);
    }
  };

  const renderCalendarDays = () => {
    let days = [];
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dayKey = `${currentYear}-${currentMonth}-${i}`;
      const isMarked = dayInfo[dayKey];
      days.push(
        <TouchableOpacity 
          key={i} 
          style={[styles.day, isMarked ? styles.markedDay : {}]} 
          onPress={() => handleDayPress(i)}
        >
          <Text style={styles.dayText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.button}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{`Tháng: ${currentMonth}, Năm: ${currentYear}`}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.button}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.calendar}>{renderCalendarDays()}</View>
      </ScrollView>
      {selectedDay && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => setDayInfo({ ...dayInfo, [selectedDay]: text })}
            value={dayInfo[selectedDay]}
            placeholder="Thêm lời nhắc"
            multiline
          />
          <TouchableOpacity style={styles.markButton} onPress={markDay}>
            <Text>Mark Day</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#FFF78A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#D80032'
  },
  button: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 300,
  },
  day: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
  },
  dayText: {
    fontSize: 18,
  },
  markedDay: {
    backgroundColor: 'orange'
  },
  inputContainer: {
    padding: 5,
    alignItems: 'center',

  },
  input: {
    borderWidth: 4,
    borderColor: 'orange',
    padding: 15,
    width: '100%',
    marginBottom: 30,
  },
  markButton: {
    padding: 10,
    backgroundColor: '#FF8400',
    borderRadius: 5,
  },
});

export default App;