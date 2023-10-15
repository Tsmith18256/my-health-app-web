import type { MEASUREMENT_SYSTEMS } from '$lib/constants/measurement-systems.constants';
import type { ObjectValues } from '$lib/types/shared/object-values';

export type MeasurementSystem = ObjectValues<typeof MEASUREMENT_SYSTEMS>;
