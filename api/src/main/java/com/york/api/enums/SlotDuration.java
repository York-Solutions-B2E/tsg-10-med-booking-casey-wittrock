package com.york.api.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SlotDuration {
    SHORT(15l), MEDIUM(30l), LONG(60l);

    private final Long duration;

    public static SlotDuration fromDuration(Long durationMin) {
        for (SlotDuration slotDuration : SlotDuration.values()) {
            if (slotDuration.getDuration().equals(durationMin)) {
                return slotDuration;
            }
        }
        throw new IllegalArgumentException("No SlotDuration with duration " + durationMin);
    }
}
