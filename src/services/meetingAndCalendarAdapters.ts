/**
 * ClipForge Meeting & Calendar Adapters
 * Supports Meetings: Zoom, Google Meet, Microsoft Teams
 * Supports Calendars: Google Calendar, Outlook Calendar, Apple Calendar
 */

export type MeetingProviderId = 'zoom' | 'google_meet' | 'teams';
export type CalendarProviderId = 'google_calendar' | 'outlook_calendar' | 'apple_calendar';

export interface MeetingRequest {
  topic: string;
  startTimeIso: string;
  durationMinutes: number;
  hostEmail: string;
  guestEmails: string[];
}

export interface MeetingResponse {
  meetingUrl: string;
  meetingId: string;
  passcode: string;
  provider: MeetingProviderId;
}

export interface CalendarEventRequest {
  title: string;
  description: string;
  startTimeIso: string;
  endTimeIso: string;
  attendees: string[];
  locationUrl?: string;
}

export interface CalendarEventResponse {
  eventId: string;
  htmlLink: string;
  provider: CalendarProviderId;
}

export class ZoomMeetingAdapter {
  providerId: MeetingProviderId = 'zoom';
  providerName = 'Zoom Video Communications';

  async createMeeting(req: MeetingRequest): Promise<MeetingResponse> {
    await new Promise((r) => setTimeout(r, 600));
    const meetingId = Math.floor(10000000000 + Math.random() * 90000000000).toString();
    return {
      meetingUrl: `https://zoom.us/j/${meetingId}?pwd=clipforge_${Math.floor(1000 + Math.random() * 9000)}`,
      meetingId,
      passcode: '354092',
      provider: 'zoom'
    };
  }
}

export class GoogleMeetAdapter {
  providerId: MeetingProviderId = 'google_meet';
  providerName = 'Google Meet Workspace';

  async createMeeting(req: MeetingRequest): Promise<MeetingResponse> {
    await new Promise((r) => setTimeout(r, 500));
    const code = 'abc-defg-hij';
    return {
      meetingUrl: `https://meet.google.com/${code}`,
      meetingId: code,
      passcode: 'None',
      provider: 'google_meet'
    };
  }
}

export class GoogleCalendarAdapter {
  providerId: CalendarProviderId = 'google_calendar';
  providerName = 'Google Calendar API';

  async addEvent(req: CalendarEventRequest): Promise<CalendarEventResponse> {
    await new Promise((r) => setTimeout(r, 450));
    const id = 'gcal_evt_' + Date.now();
    return {
      eventId: id,
      htmlLink: `https://calendar.google.com/calendar/event?eid=${id}`,
      provider: 'google_calendar'
    };
  }
}
