'use client';

import React, { useState, useEffect } from "react";

interface EmployeeProps {
    id: number;
    updateEmployeeTime: (id: number, minutes: number) => void;
}

export default function Employee({ id, updateEmployeeTime }: EmployeeProps) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        function calculateTimeDifference(start: string, end: string): number {
            if (!start || !end) return 0;

            const [startHours, startMinutes] = start.split(":").map(Number);
            const [endHours, endMinutes] = end.split(":").map(Number);

            const startDate = new Date(0, 0, 0, startHours, startMinutes);
            const endDate = new Date(0, 0, 0, endHours, endMinutes);

            const diffMs = endDate.getTime() - startDate.getTime();
            if (diffMs < 0) return 0;

            return Math.floor(diffMs / (1000 * 60)); // Convert ms to minutes
        }

        const workedMinutes = calculateTimeDifference(startTime, endTime);
        updateEmployeeTime(id, workedMinutes);
    }, [startTime, endTime]);

    return (
        <div className="flex-col border-cyan-700 border border">
            <input className="text-center placeholder-black" placeholder={`Employee ${id}`} type='string' />
        <div className="flex justify-center">
           <p>Start time:</p> {" "}
            <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <br />
            <p>End time:</p>{" "}
            <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            </div>
        </div>
    );
}
