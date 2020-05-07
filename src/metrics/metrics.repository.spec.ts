import { Test } from '@nestjs/testing';
import { MetricsRepository } from './metrics.repository';
import { METRIC_MODEL } from './metric.constants';

const mockMetricModel = () => ({
    find: jest.fn(),
    create: jest.fn(),
});

describe('MetricsRepository', () => {
    let metricsRepository;
    let metricModel;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MetricsRepository,
                {
                    provide: METRIC_MODEL,
                    useFactory: mockMetricModel,
                },
            ],
        }).compile();

        metricsRepository = module.get<MetricsRepository>(MetricsRepository);
        metricModel = module.get(METRIC_MODEL);
    });

    describe('find()', () => {
        test('it gets all metrics from model', async () => {
            metricModel.find.mockResolvedValue([]);

            expect(metricModel.find).not.toHaveBeenCalled();

            const metrics = await metricsRepository.find();

            expect(metricModel.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it gets filtered metrics from model with valid parameters', async () => {
            metricModel.find.mockResolvedValue([]);

            expect(metricModel.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: '2020-05-01T00:02:12.852Z',
                date_max: '2020-05-01T00:02:30.852Z',
            };

            const metrics = await metricsRepository.find(getMetricsFilteredDto);

            expect(metricModel.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it gets all metrics from model without any parameters', async () => {
            metricModel.find.mockResolvedValue([]);

            expect(metricModel.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {};

            const metrics = await metricsRepository.find(getMetricsFilteredDto);

            expect(metricModel.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it gets all metrics from model if only date_min param exists for date range filter', async () => {
            metricModel.find.mockResolvedValue([]);

            expect(metricModel.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: '2020-05-01T00:02:12.852Z',
            };

            const metrics = await metricsRepository.find(getMetricsFilteredDto);

            expect(metricModel.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it gets all metrics from model if only date_max param exists for date range filter', async () => {
            metricModel.find.mockResolvedValue([]);

            expect(metricModel.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_max: '2020-05-01T00:02:12.852Z',
            };

            const metrics = await metricsRepository.find(getMetricsFilteredDto);

            expect(metricModel.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it returns error if date_min param is not type of date string', async () => {
            metricModel.find.mockResolvedValue('error message');

            expect(metricModel.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: true,
                date_max: '2020-05-01T00:02:12.852Z',
            };

            const metrics = await metricsRepository.find(getMetricsFilteredDto);

            expect(metricModel.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual('error message');
        });

        test('it returns error if date_max param is not type of date string', async () => {
            metricModel.find.mockResolvedValue('error message');

            expect(metricModel.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: '2020-05-01T00:02:12.852Z',
                date_max: 'some value',
            };

            const metrics = await metricsRepository.find(getMetricsFilteredDto);

            expect(metricModel.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual('error message');
        });
    });

    describe('create()', () => {
        test('it creates a metric with valid parameters', async () => {
            metricModel.create.mockResolvedValue({});

            expect(metricModel.create).not.toHaveBeenCalled();

            const createMetricDto = {
                host: 'doganozturk.dev',
                date: new Date('2020-05-01T00:02:12.852Z'),
                fcp: 3169.5049999980256,
                resources: [
                    {
                        name:
                            'http://localhost:8080/public/favicon/android-chrome-192x192.png',
                        requestStart: 3299.9999999883585,
                        responseEnd: 3308.695000014268,
                        startTime: 3299.219999986235,
                    },
                ],
                ttfb: 5.1300000050105155,
                domContentLoaded: 2.3250000085681677,
                windowLoaded: 1.7499999958090484,
            };

            const metric = await metricModel.create(createMetricDto);

            expect(metricModel.create).toHaveBeenCalledTimes(1);
            expect(metric).toEqual({});
        });
    });
});
