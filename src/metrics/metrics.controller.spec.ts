import { Test } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';

const mockMetricsService = () => ({
    getMetrics: jest.fn(),
    getFilteredMetrics: jest.fn(),
    createMetric: jest.fn(),
});

describe('MetricsController', () => {
    let metricsController;
    let metricsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [MetricsController],
            providers: [
                {
                    provide: MetricsService,
                    useFactory: mockMetricsService,
                },
            ],
        }).compile();

        metricsService = module.get<MetricsService>(MetricsService);
        metricsController = module.get<MetricsController>(MetricsController);
    });

    describe('getMetrics()', () => {
        test('it gets all metrics from repository without any query parameters', async () => {
            metricsService.getMetrics.mockResolvedValue([]);

            expect(metricsService.getMetrics).not.toHaveBeenCalled();
            expect(metricsService.getFilteredMetrics).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {};

            const metrics = await metricsController.getMetrics(
                getMetricsFilteredDto,
            );

            expect(metricsService.getFilteredMetrics).not.toHaveBeenCalled();
            expect(metricsService.getMetrics).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });

        test('it gets some metrics from repository with query parameters', async () => {
            metricsService.getFilteredMetrics.mockResolvedValue([]);

            expect(metricsService.getMetrics).not.toHaveBeenCalled();
            expect(metricsService.getFilteredMetrics).not.toHaveBeenCalled();

            const getMetricsFilteredDto = {
                date_min: '2020-05-01T00:02:12.852Z',
                date_max: '2020-05-01T00:02:30.852Z',
            };

            const metrics = await metricsController.getMetrics(
                getMetricsFilteredDto,
            );

            expect(metricsService.getMetrics).not.toHaveBeenCalled();
            expect(metricsService.getFilteredMetrics).toHaveBeenCalledTimes(1);
            expect(metrics).toEqual([]);
        });
    });

    describe('createMetric()', () => {
        test('it creates a metric with valid post body', async () => {
            metricsService.createMetric.mockResolvedValue({});

            expect(metricsService.createMetric).not.toHaveBeenCalled();

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

            const metric = await metricsController.createMetric(
                createMetricDto,
            );

            expect(metricsService.createMetric).toHaveBeenCalledTimes(1);
            expect(metric).toEqual({});
        });
    });
});
