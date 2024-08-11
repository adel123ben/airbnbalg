"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"


interface ClenderProps {
    value: Range
    disableDate?: Date[];
    onChange: (value: RangeKeyDict) => void;
}

const Calender: React.FC<ClenderProps> = ({
    value,
    disableDate,
    onChange
}) => {
    return ( 
        <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disableDate}
        />
     );
}
 
export default Calender;