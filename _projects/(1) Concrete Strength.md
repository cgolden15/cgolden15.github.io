---
name: Concrete Strength Preditions
tools: [Python, Scikit-Learn]
image: https://www.mdpi.com/buildings/buildings-13-02252/article_deploy/html/images/buildings-13-02252-g016.png
description: Predicting the strength of concrete based on mix ratio using RFR models through Sklearn.
---

## Project Description
For my freshman year Computational Thinking and Data Science(ENGR 1330) final, we had to take a given set of data about concrete strength based on mix ratio and create an python program that could predict the strength of other mixtures, created by the user. To do this, we used a variety of libraries such as [Pandas](https://pandas.pydata.org), [matplotlib](matplotlib.org), [SeaBorn](https://seaborn.pydata.org/#), [Sklearn](https://scikit-learn.org/stable/) and more, to build RFR models and analyze their results to calculate the most optimal concrete mix ratio.  

## Project Excerpts 
To predict and model our data, we used a RFR Model style, which displays its deviation from our expected values. To do this, we implemented the following code.
```python
# Create a RandomForestRegressor model with 100 estimators
rfr0 = RandomForestRegressor(n_estimators=100)

# Train the model on the training data
rfr0.fit(x_train, y_train)

# Use the trained model to predict y values for the test set
y_pred_rfr0 = rfr0.predict(x_test)

# Print evaluation metrics for the model
print("model\t\t\t\t RMSE \t\t MSE \t\t MAE \t\t R2")
print("""RandomForestRegressor \t {:.2f} \t\t {:.2f} \t\t {:.2f} \t\t {:.2f}""".format(
    np.sqrt(mean_squared_error(y_test, y_pred_rfr0)), mean_squared_error(y_test, y_pred_rfr0),
    mean_absolute_error(y_test, y_pred_rfr0), r2_score(y_test, y_pred_rfr0)))

# Create a scatter plot comparing true and predicted values
plt.scatter(y_test, y_pred_rfr0)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'k--', lw=2)
plt.xlabel("predicted")
plt.ylabel("true")
plt.title("Random Forest Regressor")

# Display the plot
plt.show()
```
> Which returns:

![image](https://github.com/cgolden15/cgolden15.github.io/assets/61284764/668eddf7-2a95-433d-963b-806099034ae3)

While this may not look like much, this gave us a good baseline of our data for the next step:

Creating an Ordinary Least Square(OLS) regression model for each of our 4 tests is rather simple. To do this we created the following code.
```python

x1 = df_1[['BlastFurnaceSlag','Cement','FlyAsh','coarseaggregate','FineAggregate','water','superplasticizer','age']]
y1 = df_1['Cement']

regr = linear_model.LinearRegression()
regr.fit(x1,y1)

print('Intercept" \n',regr.intercept_)
print('Coefficiens: \n', regr.coef_)

new_water = 2.75
new_age = 5.3
x= sm.add_constant(x1)

model = sm.OLS(y1,x1).fit()
print(print_model)

```
> Which returns:

![image](https://github.com/cgolden15/cgolden15.github.io/assets/61284764/79a3bd2c-2fa7-484a-8260-ab0a03ed05b8)

Both of these sections of code allow us to then go on to model the relationship between our input features and the concrete compressive strength. Eventually after training the models with enough datasets, we can safely do our final calculation and predict the strongest concrete mix ratio. 

**View the full project on [github](https://github.com/cgolden15/concrete-strength/)!**