package com.sha1lib;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import java.util.UUID;

public class Sha1Module extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public Sha1Module(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "sha1Lib";
  }

  @ReactMethod
  public void sha1(final String toHash, Promise promise) {
      MessageDigest md = null;
      try {
          md = MessageDigest.getInstance("SHA-1");
          md.update(toHash.getBytes("UTF-8"));
          byte[] digest = md.digest();
          String hash = String.format("%02X", new java.math.BigInteger(1, digest));
          promise.resolve(hash);

      } catch (NoSuchAlgorithmException e) {
          e.printStackTrace();
          promise.reject("sha1", e.getMessage());
      } catch (UnsupportedEncodingException e) {
          e.printStackTrace();
          promise.reject("sha1", e.getMessage());
      }
  }

}
