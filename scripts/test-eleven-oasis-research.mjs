import test from "node:test";
import assert from "node:assert/strict";
import { shopLookExperiments, mobileAudienceResults, separateTestMetrics, relativeChange, formatChange, formatMetric } from "../src/data/eleven-oasis-research.ts";

test("mobile chart values remain separate from the dashboard's more precise reported uplifts", () => {
  const metrics = shopLookExperiments.mobile.metrics;
  assert.deepEqual(metrics.map(metric => [metric.control, metric.variant]), [[5.82,7.24],[18.4,19],[53.2,54]]);
  assert.deepEqual(metrics.map(metric => formatChange(relativeChange(metric.control,metric.variant))), ["+24.4%","+3.3%","+1.5%"]);
  assert.deepEqual(metrics.map(metric => metric.reportedChange), [24.53,3.33,1.49]);
  assert.equal(formatMetric(metrics[1],metrics[1].variant), "19.0%");
});
test("desktop comparison preserves negative and near-flat outcomes instead of declaring a universal win", () => {
  const metrics = shopLookExperiments.desktop.metrics;
  assert.deepEqual(metrics.map(metric => [metric.control,metric.variant]), [[6.357,6.806],[15.65,13.61],[35.7,35.6]]);
  assert.deepEqual(metrics.map(metric => formatChange(relativeChange(metric.control,metric.variant))), ["+7.1%","−13.0%","−0.3%"]);
  assert.equal(formatMetric(metrics[0],metrics[0].control), "6.357%");
});
test("unnamed test metrics remain one independent source snapshot", () => {
  assert.deepEqual(separateTestMetrics.map(metric => [metric.control,metric.variant]), [[8.051,10.088],[19.49,21.49],[69.56,73.15]]);
  assert.deepEqual(separateTestMetrics.map(metric => formatChange(relativeChange(metric.control,metric.variant))), ["+25.3%","+10.3%","+5.2%"]);
  assert.equal(formatMetric(separateTestMetrics[2],73.15), "$73.15");
});
test("new and returning mobile cohorts retain their individual source rates", () => {
  assert.deepEqual(mobileAudienceResults.map(audience => audience.name), ["New visitors","Returning visitors"]);
  assert.deepEqual(mobileAudienceResults.map(audience => audience.metrics.map(metric => [metric.control,metric.variant])), [
    [[4.842,6.510],[15.64,16.82],[48.6,50.09]],
    [[8.649,9.934],[26.49,27.15],[66.49,68.21]],
  ]);
  assert.equal(formatMetric(mobileAudienceResults[0].metrics[0],6.510), "6.510%");
});
