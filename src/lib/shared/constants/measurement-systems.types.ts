import type { MEASUREMENT_SYSTEMS } from '$lib/shared/constants/measurement-systems.constants';
import type { ObjectValues } from '$lib/shared/types/object-values';

export type MeasurementSystem = ObjectValues<typeof MEASUREMENT_SYSTEMS>;
