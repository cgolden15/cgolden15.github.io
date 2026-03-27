---
name: Daily Shopify POS Sales Report
tools: [Google Apps Script, JavaScript, ShopifyQL, Google Sheets]
image: https://github.com/user-attachments/assets/9096c855-8ed0-4504-a153-16c26feddcb5
description: Automated Shopify POS exports into heatmapped daily sales analytics with executive-ready summaries.
---

# Project Spotlight: Daily Shopify POS Sales Report
**Role: Creator & Developer**

## Project Overview
This project converts raw Shopify POS exports into a decision-ready analytics dashboard inside Google Sheets. It is built with Google Apps Script and designed for store managers who need quick visibility into location performance, top products, and daily trends without manually building pivot tables.

{% include elements/figure.html image="https://github.com/user-attachments/assets/9096c855-8ed0-4504-a153-16c26feddcb5" caption="Formatted output generated from raw Shopify export data." %}

## The Problem
Shopify exports are useful but not presentation-ready. Teams often spend significant time cleaning CSV data, creating ad-hoc pivots, and reformatting results before they can make decisions.

This automation solves that workflow by:
- Reading standardized Shopify export columns.
- Building grouped location/product/day tables.
- Applying heatmap colors for instant pattern recognition.
- Producing summary and product breakdown sections for stakeholders.

## Technical Approach
The script uses an event-driven workflow:
1. User pastes export data into a sheet named `RawData`.
2. An `onEdit` trigger runs the processor automatically.
3. The script rebuilds a `FormattedData` sheet with:
   - Date-based pivot columns
   - Quantity heatmaps (positive and negative values)
   - Revenue and gross sales rollups
   - Product ranking output

## Key Code Excerpts
### 1) Auto-processing trigger
```javascript
function onEdit(e) {
  if (e.source.getActiveSheet().getName() === "RawData") {
    processCSVData();
  }
}
```

### 2) Heatmap color interpolation
```javascript
function interpolateColor(value, maxValue, minValue) {
  if (value === 0) return "#ffffff";

  if (value < 0) {
    if (!minValue || minValue === 0) return "#ffcccc";
    var negativeRatio = Math.abs(value) / Math.abs(minValue);
    var enhancedNegRatio = Math.pow(negativeRatio, 0.5);
    var r = Math.floor(255 - (255 - 255) * enhancedNegRatio);
    var g = Math.floor(255 - (255 - 140) * enhancedNegRatio);
    var b = Math.floor(255 - (255 - 100) * enhancedNegRatio);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  var ratio = value / maxValue;
  var enhancedRatio = Math.pow(ratio, 0.5);
  var r = Math.floor(255 - (255 - 100) * enhancedRatio);
  var g = Math.floor(255 - (255 - 150) * enhancedRatio);
  var b = Math.floor(255 - (255 - 200) * enhancedRatio);
  return "rgb(" + r + "," + g + "," + b + ")";
}
```

### 3) Core aggregation behavior
```javascript
// Build pivot table structure: location -> product -> date -> quantity
if (!pivot[location]) {
  pivot[location] = {};
}
if (!pivot[location][product]) {
  pivot[location][product] = {};
}
pivot[location][product][dateLabel] = (pivot[location][product][dateLabel] || 0) + qty;
```

## ShopifyQL Example Used for Export
```sql
FROM sales
  SHOW net_items_sold, gross_sales, total_sales
  WHERE product_title IN ('PRODUCT NAMES HERE', 'COMMA SEPERATED')
  GROUP BY pos_location_name, day, product_title_at_time_of_sale,
    product_variant_title_at_time_of_sale WITH GROUP_TOTALS, TOTALS, CURRENCY 'USD'
  SINCE 2024-09-13 UNTIL 2024-10-30
  ORDER BY total_sales__pos_location_name_totals DESC, day ASC,
    total_sales__pos_location_name_day_product_title_at_time_of_sale_totals DESC,
    total_sales DESC, pos_location_name ASC, product_title_at_time_of_sale ASC,
    product_variant_title_at_time_of_sale ASC
VISUALIZE total_sales
```

## Output Highlights
- Multi-location performance comparison in one view.
- Product and variant-level trend visibility.
- Returns/refunds shown with soft red-orange heatmap logic.
- Fast handoff to leadership with readable, presentation-ready formatting.

## Business Impact
- Reduced reporting friction from raw-export cleanup to near one-click refresh.
- Improved operational decision speed for staffing and inventory planning.
- Created a consistent analytics format that can be reused across reporting cycles.

<br>
{% include elements/button.html link="https://github.com/shady-brook-farm/Daily-Shopify-POS-Sales-Report" text="View full project on GitHub" block=true %}
