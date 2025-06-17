from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

import pickle


def load_dataset():
    diabetes = load_diabetes()
    X, y = diabetes.data, diabetes.target

    print(f"Dataset shape: {X.shape}")
    print(f"Features: {list(diabetes.feature_names)}")
    print(f"Target range: {y.min():.1f} to {y.max():.1f}")

    return X, y


def prepare_data(X, y):
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print(f"Training samples: {X_train.shape[0]}")
    print(f"Test samples: {X_test.shape[0]}")

    return X_train, X_test, y_train, y_test


def train_model(X_train, y_train) -> RandomForestRegressor:
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    return model


def save_model(model, filename="models/diabetes_model.pkl"):
    with open(filename, "wb") as file:
        pickle.dump(model, file)
    print(f"Model saved to {filename}")


def make_predictions(model, X_test):
    y_pred = model.predict(X_test)

    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"Mean Squared Error: {mse:.2f}")
    print(f"R^2 Score: {r2:.2f}")

    return y_pred


if __name__ == "__main__":
    X, y = load_dataset()

    X_train, X_test, y_train, y_test = prepare_data(X, y)
    model = train_model(X_train, y_train)
    print("Model training complete.")
    save_model(model)

    y_pred = make_predictions(model, X_test)
    print(f"Predictions: {y_pred[:5]}")
