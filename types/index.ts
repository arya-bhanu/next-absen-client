import { SVGProps } from 'react';

export type Datetime = {
	created_at: Date;
	updated_at?: Date;
	deleted_at?: Date;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

// DB Types
export type StudentAttendance = Datetime & {
	id: number;
	student_class_id: number;
	last_edited_by: number;
	location?: string;
	photo_taken?: string;
	status_attendance_id: number;
	class_meeting_id: number;
	approved_status: string;
};

export type ClassMeeting = Datetime & {
	id: number;
	class_practicum_id: number;
	nth_meeting: number;
	topic: string;
	information: string;
	created_by: number;
	last_edited_by: number;
};

// API Types
export enum ApprovalStatus {
	granted = 'Disetujui',
	rejected = 'Ditolak',
	waiting = 'Menunggu',
}
