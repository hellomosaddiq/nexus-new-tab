# Smart Date Features

NEXUS offers 12 intelligent date insights that provide contextual information about time, progress, and productivity. Users can select up to 3 features to display alongside the main clock.

## 🎯 Available Features

### 1. Week Number
**Display**: "Week 25"  
**Description**: Shows the current week number of the year (1-52)  
**Use Case**: Project planning, scheduling, ISO week standards  
**Algorithm**: ISO 8601 week numbering system  

```javascript
// Implementation concept
const weekNumber = getISOWeek(new Date());
// Handles year boundaries and leap years correctly
```

### 2. Year Progress
**Display**: "46% of 2025"  
**Description**: Percentage of the current year completed  
**Use Case**: Annual goal tracking, time awareness  
**Algorithm**: Days elapsed / Total days in year × 100  

**Visual**: Includes subtle progress indicator

### 3. Weekend Status
**Display**: "3 days to weekend" or "Weekend!"  
**Description**: Countdown to weekend or weekend indicator  
**Use Case**: Work-life balance, motivation  
**Logic**: 
- Monday-Thursday: Shows days until Saturday
- Friday: "Tomorrow is weekend!"
- Saturday-Sunday: "Weekend!" or "Enjoy weekend!"

### 4. Working Days
**Display**: "22 working days"  
**Description**: Business days remaining in current month  
**Use Case**: Project deadlines, business planning  
**Algorithm**: Excludes weekends, includes current day if it's a weekday  

### 5. Quarter Progress
**Display**: "Q2: 67%"  
**Description**: Current quarter completion percentage  
**Use Case**: Business reporting, quarterly goals  
**Quarters**:
- Q1: January-March
- Q2: April-June  
- Q3: July-September
- Q4: October-December

### 6. Month Progress
**Display**: "June: 53%"  
**Description**: Current month completion percentage  
**Use Case**: Monthly goals, habit tracking  
**Algorithm**: (Current day - 1) / Days in month × 100  

### 7. Week Progress
**Display**: "Week: 71%"  
**Description**: Current week completion percentage  
**Use Case**: Weekly planning, productivity tracking  
**Algorithm**: Days completed in current week / 7 × 100  

### 8. Days Since New Year
**Display**: "167 days"  
**Description**: Days elapsed since January 1st  
**Use Case**: Time awareness, annual tracking  
**Algorithm**: Simple date difference from January 1st  

### 9. Season Info
**Display**: "Summer Day 15"  
**Description**: Current season and day within that season  
**Use Case**: Seasonal awareness, natural rhythms  
**Seasons** (Northern Hemisphere):
- Spring: March 20 - June 20
- Summer: June 21 - September 22
- Autumn: September 23 - December 20
- Winter: December 21 - March 19

### 10. Moon Phase
**Display**: "Waxing Crescent"  
**Description**: Current lunar phase  
**Use Case**: Natural cycles, astronomy interest  
**Phases**: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, Waning Crescent  

**Algorithm**: Astronomical calculation based on lunar cycle (29.53 days)

### 11. Daylight Info
**Display**: "Sunset: 8:24 PM"  
**Description**: Sunset time and daylight hours  
**Use Case**: Planning outdoor activities, circadian rhythm  
**Note**: Uses approximate calculations, may vary by location  

### 12. Days to Weekend
**Display**: "2 days"  
**Description**: Simple countdown to next weekend  
**Use Case**: Motivation, work-week tracking  
**Logic**: Always shows days until Saturday (0-6)  

## ⚙️ Configuration

### Selection Process
1. **Open Settings** (Press `S`)
2. **Navigate to Features tab**
3. **Choose up to 3 features** from the list
4. **Minimum 1 feature** must be selected when smart dates are enabled
5. **Changes apply instantly**

### Smart Selection Tips
**For Productivity Focus**:
- Week Number (project planning)
- Working Days (deadline awareness)
- Quarter Progress (business goals)

**For Personal Motivation**:
- Year Progress (annual goals)
- Weekend Status (work-life balance)
- Month Progress (habit tracking)

**For Natural Awareness**:
- Season Info (seasonal connection)
- Moon Phase (natural cycles)
- Daylight Info (circadian rhythm)

## 🎨 Visual Design

### Display Format
- **Clean typography** using selected font theme
- **Smooth transitions** on data updates
- **Consistent spacing** with 8px grid system
- **Theme-aware colors** matching selected color theme

### Update Frequency
- **Real-time updates** for time-sensitive features
- **Midnight refresh** for date-dependent features
- **Smooth transitions** when data changes
- **Performance optimized** to prevent unnecessary calculations

## 🔧 Technical Implementation

### Performance Optimization
```javascript
// Efficient calculation caching
const dateCache = {
    lastCalculated: null,
    cachedValues: {},
    
    getFeature(featureName) {
        const now = new Date();
        if (this.shouldRecalculate(now)) {
            this.recalculateAll(now);
        }
        return this.cachedValues[featureName];
    }
};
```

### Accuracy Considerations
- **ISO standards** for week numbering
- **Leap year handling** for year progress
- **Time zone awareness** for daylight calculations
- **Astronomical precision** for moon phases

### Accessibility Features
- **Screen reader friendly** descriptions
- **High contrast** compatible
- **Keyboard navigation** in settings
- **Semantic markup** for assistive technologies

## 🌐 Localization Considerations

### Current Implementation
- **English only** currently
- **24-hour time** support
- **ISO date standards** used
- **Extensible architecture** for future localization

### Future Enhancements
- **Multiple languages** support planned
- **Regional date formats** adaptation
- **Cultural calendar** systems (lunar, fiscal years)
- **Timezone-specific** calculations

## 📊 Usage Analytics

### Popular Combinations
Based on user feedback and logical groupings:

1. **Productivity Trio**: Week Number + Working Days + Quarter Progress
2. **Progress Tracker**: Year Progress + Month Progress + Week Progress  
3. **Natural Rhythm**: Season Info + Moon Phase + Daylight Info
4. **Work-Life Balance**: Weekend Status + Working Days + Week Progress

### Performance Impact
- **Minimal CPU usage** - Calculations cached and optimized
- **No network requests** - All calculations local
- **Memory efficient** - Lightweight data structures
- **Battery friendly** - Efficient update cycles

## 🔮 Future Features

### Planned Additions
- **Custom date ranges** (days until vacation, etc.)
- **Goal integration** (progress toward personal goals)
- **Historical data** (this day last year)
- **Productivity metrics** (focus time tracking)

### Community Requests
- **Fiscal year support** for business users
- **Academic calendar** for students/educators
- **Religious calendar** integration
- **Custom formulas** for power users

---

**Tip**: Experiment with different combinations to find what motivates and informs you best! The smart date features are designed to enhance your productivity and time awareness without overwhelming the clean interface.

For technical details, see the [Architecture Guide](../architecture.md) or check the implementation in `src/pages/newtab/script.js`.
