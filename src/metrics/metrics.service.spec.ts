import { Test } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { MetricsRepository } from './metrics.repository';

const mockMetricsRepository = () => ({
    find: jest.fn(),
    create: jest.fn(),
});

describe('MetricsService', () => {
    let metricsService;
    let metricsRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MetricsService,
                {
                    provide: MetricsRepository,
                    useFactory: mockMetricsRepository,
                },
            ],
        }).compile();

        metricsService = module.get<MetricsService>(MetricsService);
        metricsRepository = module.get<MetricsRepository>(MetricsRepository);
    });

    describe('getMetrics()', () => {
        test('it gets all metrics from repository', async () => {
            metricsRepository.find.mockResolvedValue([]);

            expect(metricsRepository.find).not.toHaveBeenCalled();

            const metrics = await metricsService.getMetrics();

            expect(metricsRepository.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });
    });

    describe('getFilteredMetrics()', () => {
        test('it gets filtered metrics from repository with valid parameters', async () => {
            metricsRepository.find.mockResolvedValue([]);

            expect(metricsRepository.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: '2020-05-01T00:02:12.852Z',
                date_max: '2020-05-01T00:02:30.852Z',
            };

            const metrics = await metricsService.getFilteredMetrics(
                getMetricsFilteredDto,
            );

            expect(metricsRepository.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it gets all metrics from repository without any parameters', async () => {
            metricsRepository.find.mockResolvedValue([]);

            expect(metricsRepository.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {};

            const metrics = await metricsService.getFilteredMetrics(
                getMetricsFilteredDto,
            );

            expect(metricsRepository.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it gets all metrics from repository if only date_min param exists for date range filter', async () => {
            metricsRepository.find.mockResolvedValue([]);

            expect(metricsRepository.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: '2020-05-01T00:02:12.852Z',
            };

            const metrics = await metricsService.getFilteredMetrics(
                getMetricsFilteredDto,
            );

            expect(metricsRepository.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it gets all metrics from repository if only date_max param exists for date range filter', async () => {
            metricsRepository.find.mockResolvedValue([]);

            expect(metricsRepository.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_max: '2020-05-01T00:02:12.852Z',
            };

            const metrics = await metricsService.getFilteredMetrics(
                getMetricsFilteredDto,
            );

            expect(metricsRepository.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it returns error if date_min param is not type of date string', async () => {
            metricsRepository.find.mockResolvedValue('error message');

            expect(metricsRepository.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: true,
                date_max: '2020-05-01T00:02:12.852Z',
            };

            const metrics = await metricsService.getFilteredMetrics(
                getMetricsFilteredDto,
            );

            expect(metricsRepository.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual('error message');
        });

        test('it returns error if date_max param is not type of date string', async () => {
            metricsRepository.find.mockResolvedValue('error message');

            expect(metricsRepository.find).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: '2020-05-01T00:02:12.852Z',
                date_max: 'some value',
            };

            const metrics = await metricsService.getFilteredMetrics(
                getMetricsFilteredDto,
            );

            expect(metricsRepository.find).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual('error message');
        });
    });

    describe('createMetric()', () => {
        test('it creates a metric with valid parameters', async () => {
            metricsRepository.create.mockResolvedValue({});

            expect(metricsRepository.create).not.toHaveBeenCalled();

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

            const metric = await metricsRepository.create(createMetricDto);

            expect(metricsRepository.create).toHaveBeenCalledTimes(1);
            expect(metric).toEqual({});
        });
    });
});
