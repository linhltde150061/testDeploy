import { Grid } from "@mui/material";
import React from "react";

export default function Wallet({ wallet, transaction }) {
  const currentDate = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-GB", options);
  return (
    <>
      <div
        style={{
          flex: 1,
          borderRadius: "14px",
          backgroundColor: "#4745a4",
          padding: "20px",
          marginBottom: "40px",
        }}>
        <div
          style={{
            alignSelf: "stretch",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "18px",
            fontSize: "18px",
            color: "#fff",
          }}>
          <div
            style={{
              alignSelf: "stretch",
              flex: "1",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "18px",
            }}>
            <div
              style={{
                alignSelf: "stretch",
                flex: "1",
                borderRadius: "14px",
                backgroundColor: "#4745a4",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "20px",
              }}>
              <div
                style={{
                  alignSelf: "stretch",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}>
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "9px",
                  }}></div>
                <div
                  style={{
                    flexShrink: "0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: "9px",
                  }}>
                  <div
                    style={{
                      position: "relative",
                      lineHeight: "24px",
                      fontWeight: "600",
                    }}>
                    The amount you request payment
                  </div>
                  <div
                    style={{
                      flexShrink: "0",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "4px",
                      fontSize: "12px",
                    }}></div>
                </div>
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  position: "relative",
                  borderTop: "1px solid #fff",
                  boxSizing: "border-box",
                  height: "1px",
                  opacity: "0.2",
                }}
              />
              <div
                style={{
                  alignSelf: "stretch",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "28px",
                }}>
                <div
                  style={{
                    position: "relative",
                    letterSpacing: "-2px",
                    fontWeight: "600",
                  }}>
                  {wallet?.totalRequestAmount?.toLocaleString()} VND
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div
            style={{
              fontSize: "20px",
              borderRadius: "14px",
              backgroundColor: "#4745a4",
              textAlign: "right",
              width: "450px",
              padding: "37px",
            }}>
            <div
              style={{
                alignSelf: "stretch",
                flex: "1",
                borderRadius: "14px",
                backgroundColor: "#fff",
                border: "1px solid rgba(222, 222, 222, 0.7)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "20px",
                color: "#0d163a",
              }}>
              <div
                style={{
                  alignSelf: "stretch",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}>
                <div
                  style={{
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "9px",
                  }}>
                  <div
                    style={{
                      flexShrink: "0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "9px",
                    }}>
                    <div
                      style={{
                        position: "relative",
                        lineHeight: "24px",
                        fontWeight: "600",
                      }}>
                      Transactions
                    </div>
                    <div
                      style={{
                        flexShrink: "0",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "4px",
                        fontSize: "12px",
                      }}>
                      <div
                        style={{
                          position: "relative",
                          opacity: "1",
                          fontSize: "2em",
                        }}>
                        {transaction}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div
            style={{
              width: "450px",
              borderRadius: "30px",
              textAlign: "left",
              fontSize: "19px",
              color: "#fff",
            }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "184px",
                textAlign: "left",
                fontSize: "14px",
                color: "#fff",
                fontFamily: "'Cera Pro'",
              }}>
              <div
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  top: "0%",
                  right: "0%",
                  bottom: "0%",
                  left: "0%",
                  borderRadius: "30px",
                  background: "black",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "52.38%",
                  top: "calc(50% + 5px)",
                  left: "9.52%",
                  letterSpacing: "0.5px",
                  fontWeight: "500",
                  display: "inline-block",
                  height: "13px",
                  opacity: "0.9",
                }}>
                {wallet?.bankCard}
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "52.38%",
                  top: "calc(50% + 30px)",
                  left: "9.52%",
                  letterSpacing: "0.5px",
                  fontWeight: "500",
                  display: "inline-block",
                  height: "13px",
                  opacity: "0.9",
                  fontSize: "10px",
                }}>
                {wallet?.accountOwnerBank}
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "13.65%",
                  top: "calc(50% + 54px)",
                  left: "76.83%",
                  letterSpacing: "0.5px",
                  fontWeight: "500",
                  textAlign: "right",
                  display: "inline-block",
                  height: "13px",
                }}>
                {formattedDate}
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "52.38%",
                  top: "calc(50% + 54px)",
                  left: "9.52%",
                  letterSpacing: "0.5px",
                  fontWeight: "500",
                  display: "inline-block",
                  height: "13px",
                  opacity: "0.9",
                }}>
                {wallet?.accountNumberBank}
              </div>
              <img
                style={{
                  position: "absolute",
                  height: "19.52%",
                  width: "14.29%",
                  top: "13.59%",
                  right: "9.52%",
                  bottom: "66.89%",
                  left: "76.19%",
                  maxWidth: "100%",
                  overflow: "hidden",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
                alt=""
                src="https://xlink.vn/dlmvt0ep"
              />
              <div
                style={{
                  position: "absolute",
                  width: "46.03%",
                  top: "calc(50% - 40px)",
                  left: "9.52%",
                  fontSize: "28px",
                  fontWeight: "500",
                  display: "inline-block",
                  height: "26px",
                }}>
                {wallet?.ActualTotalAmount?.toLocaleString()} VND
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "40%",
                  top: "calc(50% - 62px)",
                  left: "9.52%",
                  fontWeight: "500",
                  display: "inline-block",
                  height: "13px",
                  opacity: "0.54",
                }}>
                Current Balance
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
